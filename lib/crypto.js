import crypto from 'crypto'

const ENCRYPTION_KEY = "ZP6iLAaqr$wSVL96ZCd7U4N*wRBfO4xk" // 32Byte
const BUFFER_KEY = "yE=ckT1ekzddAIdH" // 16Byte
const ENCRYPT_METHOD = "aes-256-cbc" // 暗号化方式
const ENCODING = "hex" // 暗号化時のencoding

export const getEncryptedString = raw => {
  let iv = Buffer.from(BUFFER_KEY)
  let cipher = crypto.createCipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(raw)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return encrypted.toString(ENCODING)
}

export const getDecryptedString = encrypted => {
  let iv = Buffer.from(BUFFER_KEY)
  let encryptedText = Buffer.from(encrypted, ENCODING)
  let decipher = crypto.createDecipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
