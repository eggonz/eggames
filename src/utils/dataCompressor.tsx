import pako from 'pako'

function compressData(data: string): string {
  // Compress using zlib
  const compressed = pako.deflate(data)

  // Convert to Base64
  return btoa(String.fromCharCode(...compressed))
}

function decompressData(compressedBase64: string): string {
  // Convert from Base64
  const compressed = Uint8Array.from(atob(compressedBase64), c => c.charCodeAt(0))

  // Decompress using zlib
  return pako.inflate(compressed, { to: 'string' })
}

export { compressData, decompressData }