import pako from 'pako'

/**
 * Base64 Gzip 解码
 */
export function decodeGzipBase64(base64Str: string) {
  // 1. base64 -> Uint8Array
  const str = atob(base64Str)
  const charData = str.split('').map(c => c.charCodeAt(0))
  const binData = new Uint8Array(charData)

  // 2. 解压
  const data = pako.ungzip(binData, { to: 'string' })
  return data
}
