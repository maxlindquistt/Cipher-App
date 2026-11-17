import { Cipher } from '../cipherModule/Cipher'

export type CipherId = 'caesar' | 'vigenere' | 'atbash'
export type CipherMode = 'encode' | 'decode'

export const CIPHER_OPTIONS: ReadonlyArray<{ value: CipherId; label: string }> = [
  { value: 'caesar', label: 'Caesar' },
  { value: 'vigenere', label: 'Vigenère' },
  { value: 'atbash', label: 'Atbash' },
]

export function isCipherId(value: string): value is CipherId {
  return CIPHER_OPTIONS.some((option) => option.value === value)
}

export const ALPHABET_LENGTH = 26

/** Wraps any integer into the 0–25 range. */
export function wrapShift(value: number): number {
  return ((value % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH
}

/**
 * Parses the shift field. An empty or non-numeric field counts as 0,
 * so NaN never reaches the cipher.
 */
export function parseShift(text: string): number {
  const parsed = Number.parseInt(text, 10)
  return Number.isNaN(parsed) ? 0 : wrapShift(parsed)
}

export interface CipherSettings {
  cipher: CipherId
  mode: CipherMode
  shift: number
  keyword: string
}

const cipher = new Cipher()

export function runCipher(text: string, { cipher: id, mode, shift, keyword }: CipherSettings): string {
  if (text === '') return ''
  const encode = mode === 'encode'

  switch (id) {
    case 'caesar':
      return encode ? cipher.encryptCaesar(shift, text) : cipher.decryptCaesar(shift, text)
    case 'vigenere':
      return encode ? cipher.encryptVigenere(keyword, text) : cipher.decryptVigenere(keyword, text)
    case 'atbash':
      return encode ? cipher.encryptAtbash(text) : cipher.decryptAtbash(text)
  }
}
