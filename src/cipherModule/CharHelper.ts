export function getCharInfo(char: string, alphabet: string) {
  const isUpperCase = char === char.toUpperCase();
  const lowerChar = char.toLowerCase();
  const index = alphabet.indexOf(lowerChar);
  return { isUpperCase, lowerChar, index };
}
