import { getCharInfo } from "./CharHelper.js";

export class CaesarCipher {
  shift: number;
  alphabet: string;

  constructor(shift: number) {
    this.shift = shift;
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  // Proper modulo: always returns a value in [0, alphabet.length)
  private wrap(n: number): number {
    const len = this.alphabet.length;
    return ((n % len) + len) % len;
  }

  encrypt(str: string): string {
    return str
      .split("")
      .map((char) => {
        // Get character info (case and index in alphabet)
        const { isUpperCase, index } = getCharInfo(char, this.alphabet);
        if (index === -1) return char;

        // Calculate the shifted index, wrapping around the alphabet
        const shiftedIndex = this.wrap(index + this.shift);
        const shiftedChar = this.alphabet[shiftedIndex] ?? char;
        // Restore original case
        return isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
      })
      .join("");
  }

  decrypt(str: string): string {
    return str
      .split("")
      .map((char) => {
        // Get character info (case and index in alphabet)
        const { isUpperCase, index } = getCharInfo(char, this.alphabet);
        if (index === -1) return char;

        // Calculate the shifted index for decryption, wrapping around the alphabet
        const newIndex = this.wrap(index - this.shift);
        const newChar = this.alphabet[newIndex] ?? char;
        // Restore original case
        return isUpperCase ? newChar.toUpperCase() : newChar;
      })
      .join("");
  }
}
