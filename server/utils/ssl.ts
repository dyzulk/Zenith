/**
 * Normalizes CA certificate string to standard PEM format.
 * Handles literal \n sequences, \r\n line endings, and single-line formats.
 */
export const normalizeCA = (ca: string | undefined): string | undefined => {
  if (!ca || typeof ca !== 'string') return ca

  // 1. Convert literal "\n" strings into real newlines and remove \r
  let normalized = ca.replace(/\\n/g, '\n').replace(/\r/g, '').trim()

  const header = '-----BEGIN CERTIFICATE-----'
  const footer = '-----END CERTIFICATE-----'

  // 2. Handle single-line format or incorrectly formatted blocks
  // Check if it's missing internal newlines (only has one at the end or none)
  const newlineCount = (normalized.match(/\n/g) || []).length
  
  if (newlineCount <= 1) {
    let content = normalized
    
    // Extract base64 content between tags if they exist
    if (content.includes(header)) {
      content = content.substring(content.indexOf(header) + header.length)
    }
    if (content.includes(footer)) {
      content = content.substring(0, content.indexOf(footer))
    }
    
    // Remove ALL remaining whitespace/garbage
    content = content.replace(/\s/g, '')
    
    // Wrap content to 64 chars per line (RFC 7468)
    const lines = content.match(/.{1,64}/g) || []
    normalized = `${header}\n${lines.join('\n')}\n${footer}`
  }

  return normalized
}
