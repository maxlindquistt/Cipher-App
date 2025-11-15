export class AtbashCipher {
    alphabet: string;
    reversedAlphabet: string;

    constructor() {
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
        this.reversedAlphabet = this.alphabet.split('').reverse().join('');
    }
    
    encrypt(plaintext: string): string {
        return this.transform(plaintext);
    }

    decrypt(ciphertext: string): string {
        return this.transform(ciphertext);
    }
    
    private transform(input: string): string {
        return input.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = this.alphabet.indexOf(lowerChar);
            
            if (index !== -1) {
                const transformedChar = this.reversedAlphabet[index];
                return char === char.toUpperCase() ? transformedChar?.toUpperCase() : transformedChar;
            } else {
                return char;
            }
        }).join('');
    }
}


