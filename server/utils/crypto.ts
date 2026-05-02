/**
 * Native Crypto Password Hashing for Cloudflare Workers
 * Uses PBKDF2 with SHA-256 for secure hashing without external dependencies
 */

const ITERATIONS = 100000
const SALT_SIZE = 16
const KEY_LEN = 32

/**
 * Hash a password using PBKDF2
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const passwordBuffer = encoder.encode(password)
  const salt = crypto.getRandomValues(new Uint8Array(SALT_SIZE))

  const baseKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    baseKey,
    KEY_LEN * 8
  )

  const combined = new Uint8Array(SALT_SIZE + KEY_LEN)
  combined.set(salt)
  combined.set(new Uint8Array(derivedBits), SALT_SIZE)

  // Encode to base64 for storage
  return btoa(String.fromCharCode(...combined))
}

/**
 * Compare a password with a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder()
    const passwordBuffer = encoder.encode(password)
    
    // Decode from base64
    const combined = new Uint8Array(atob(hash).split('').map(c => c.charCodeAt(0)))
    
    const salt = combined.slice(0, SALT_SIZE)
    const originalBits = combined.slice(SALT_SIZE)

    const baseKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      baseKey,
      KEY_LEN * 8
    )

    const derivedArray = new Uint8Array(derivedBits)
    
    // Constant-time comparison
    if (derivedArray.length !== originalBits.length) return false
    
    let result = 0
    for (let i = 0; i < derivedArray.length; i++) {
      result |= derivedArray[i] ^ originalBits[i]
    }
    
    return result === 0
  } catch (e) {
    return false
  }
}
