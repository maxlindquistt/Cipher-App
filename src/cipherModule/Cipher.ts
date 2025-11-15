import { AtbashCipher } from "./AtbashCipher.js";
import { CaesarCipher } from "./CaesarCipher.js";
import { VigenereCipher } from "./VigenereCipher.js";

export class Cipher {
  encryptCaesar(shift: number, text: string): string {
    const caesar = new CaesarCipher(shift);
    return caesar.encrypt(text);
  }

  decryptCaesar(shift: number, text: string): string {
    const caesar = new CaesarCipher(shift);
    return caesar.decrypt(text);
  }

  encryptVigenere(keyword: string, text: string): string {
    const vigenere = new VigenereCipher(keyword);
    return vigenere.encrypt(text);
  }

  decryptVigenere(keyword: string, text: string): string {
    const vigenere = new VigenereCipher(keyword);
    return vigenere.decrypt(text);
  }

  encryptAtbash(text: string): string {
    const atbash = new AtbashCipher();
    return atbash.encrypt(text);
  }

  decryptAtbash(text: string): string {
    const atbash = new AtbashCipher();
    return atbash.decrypt(text);
  }
}
