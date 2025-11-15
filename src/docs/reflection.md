# Clean Code Reflection (Chapters 2–11)

Here's how I applied Clean Code principles to this cipher tool project and reflected on each chapter with code examples and explanations.

---

## Chapter 2 — Meaningful Names

**Reflection:**
Names should reveal intent without needing comments to explain them. I fixed a naming inconsistency where the import used `DropDown` but the component was `Dropdown`. Functions like `handleCaesarShiftChange` and `handleVigenereKeywordChange` clearly state what they do. No abbreviations, no mystery, you can read the code and understand it immediately.

**Code Example:**
```typescript
const handleCaesarShiftChange = (value: number) => {
  setCaesarShift(value)
}

const handleVigenereKeywordChange = (value: string) => {
  setVigenereKeyword(value)
}
```
---

## Chapter 3 — Functions

**Reflection:**
Functions should be small and do one thing. I kept handlers focused—`handleInputChange` just updates input, nothing else. The `useEffect` hook centralizes all cipher processing in one place instead of scattering logic everywhere. Each function has a clear job and doesn't try to do too much.

**Code Example:**
```typescript
useEffect(() => {
  if (inputText) {
    const cipher = new Cipher()
    let result = ''
    
    switch (selectedCipher) {
      case 'caesar':
        result = cipherMode === 'encode'
          ? cipher.encryptCaesar(caesarShift, inputText)
          : cipher.decryptCaesar(caesarShift, inputText)
        break
      // ... other cases
    }
    setOutputText(result)
  }
}, [cipherMode, inputText, vigenereKeyword, caesarShift, selectedCipher])
```

---

## Chapter 4 — Comments

**Reflection:**
Good code explains itself. I only added comments where absolutely necessary—like the `@ts-nocheck` in test files to handle Deno's TypeScript setup. Otherwise, clear naming means no comments needed.

**Code Example:**
```typescript
// @ts-nocheck - Deno handles types differently than project tsconfig
/// <reference lib="deno.ns" />
import { assertEquals } from "jsr:@std/assert";
```

---

## Chapter 5 — Formatting

**Reflection:**
Consistent formatting makes code easier to scan. The project already has Prettier set up, so indentation and spacing are uniform. Related code stays together, blank lines separate different concerns, nothing fancy.

**Code Example:**
```typescript
return (
  <div className="cipher-tool">
    <InputField value={inputText} onChange={...} />
    
    <div className="options-section">
      <EncodeOrDecodeOption onChange={...} value={cipherMode} />
      <Dropdown options={cipherOptions} value={selectedCipher} />
    </div>
  </div>
)
```

---

## Chapter 6 — Objects and Data Structures

**Reflection:**
Each cipher class hides its internals and just gives you `encrypt` and `decrypt` methods. You don't need to know about the alphabet string or shifting logic, just call the method. 

**Code Example:**
```typescript
export class CaesarCipher {
  shift: number;
  alphabet: string;

  constructor(shift: number) {
    this.shift = shift;
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  encrypt(str: string): string {
    // ... shifts each character
  }
}
```

---

## Chapter 7 — Error Handling

**Reflection:**
Honestly, error handling here is pretty basic. Functions assume you're giving them reasonable input. Non-letter characters? They just pass through unchanged. For an educational tool, this works fine, but a production app would need more validation and user feedback.

**Code Example:**
```typescript
const { isUpperCase, index } = getCharInfo(char, this.alphabet);
if (index === -1) return char; // Not a letter? Keep it as-is
```

---

## Chapter 8 — Boundaries

**Reflection:**
The UI talks to a `Cipher` facade, not directly to individual cipher classes. This boundary makes it easy to swap implementations or add new ciphers without touching the UI. No external dependencies

**Code Example:**
```typescript
export class Cipher {
  encryptCaesar(shift: number, plaintext: string): string {
    const caesarCipher = new CaesarCipher(shift);
    return caesarCipher.encrypt(plaintext);
  }
  // ... same pattern for other ciphers
}
```

---

## Chapter 9 — Unit Tests

**Reflection:**
This project has tons of tests, 102 in total covering Caesar, Vigenere, and Atbash. Each test checks one thing with a descriptive name. I added tests for edge cases like shift=26 and emoji handling. They run fast and independently, which is exactly what you want. At first it was tricky to set up Deno tests in this Node-based project as i have never done it before, but once configured it worked smoothly.

**Code Example:**
```typescript
Deno.test("Caesar Cipher - Encrypt with shift 26 (full rotation)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(26, "HELLO WORLD");
  assertEquals(result, "HELLO WORLD");
});
```

---

## Chapter 10 — Classes

**Reflection:**
Each cipher class has one job: encrypt and decrypt using its algorithm. Constructor sets up what you need, public methods do the work, private helpers stay hidden.

**Code Example:**
```typescript
export class VigenereCipher {
  keyword: string;
  alphabet: string;

  constructor(keyword: string) {
    this.keyword = keyword.toLowerCase();
    this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  }

  encrypt(str: string): string { /* ... */ }
  decrypt(str: string): string { /* ... */ }
}
```

---

## Chapter 11 — Systems

**Reflection:**
The big picture: UI layer talks to cipher logic, cipher logic doesn't know UI exists. Tests sit separately. Clean separation means you can change one without breaking the other.

---

## Summary

Made some small tweaks (renamed `DropDown` to `Dropdown`, added a few tests). The code was already pretty clean to start with (just according to me), good naming, focused functions, lots of tests. There's room for improvement (better error handling for example).
