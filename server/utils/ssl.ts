/**
 * Normalizes CA certificate string to standard PEM format.
 * Handles literal \n sequences and single-line formats often found in Cloudflare Dashboard.
 */
export const normalizeCA = (ca: string | undefined): string | undefined => {
  if (!ca || typeof ca !== 'string') return ca

  // 1. Convert literal "\n" strings into real newlines
  let normalized = ca.replace(/\\n/g, '\n').trim()

  // 2. Handle single-line format (missing internal newlines)
  // Check if it's a single line (excluding potential trailing newline from trim)
  if (!normalized.includes('\n', normalized.indexOf('\n') + 1)) {
    const header = '-----BEGIN CERTIFICATE-----'
    const footer = '-----END CERTIFICATE-----'
    
    if (normalized.startsWith(header) && normalized.endsWith(footer)) {
      const content = normalized
        .replace(header, '')
        .replace(footer, '')
        .replace(/\s/g, '') // Remove any whitespace
      
      // Wrap content to 64 chars per line (RFC 7468)
      const lines = content.match(/.{1,64}/g) || []
      normalized = `${header}\n${lines.join('\n')}\n${footer}`
    }
  }

  return normalized
}
