// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/// <reference lib="deno.ns" />
import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../../cipherModule/Cipher";

// Basic Encryption Tests
Deno.test("Caesar Cipher - Encrypt with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "HELLO WORLD");
  assertEquals(result, "KHOOR ZRUOG");
});

Deno.test("Caesar Cipher - Encrypt lowercase with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "hello world");
  assertEquals(result, "khoor zruog");
});

Deno.test("Caesar Cipher - Encrypt mixed case with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "Hello World");
  assertEquals(result, "Khoor Zruog");
});

// Basic Decryption Tests
Deno.test("Caesar Cipher - Decrypt with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "KHOOR ZRUOG");
  assertEquals(result, "HELLO WORLD");
});

Deno.test("Caesar Cipher - Decrypt lowercase with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "khoor zruog");
  assertEquals(result, "hello world");
});

Deno.test("Caesar Cipher - Decrypt mixed case with shift 3", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "Khoor Zruog");
  assertEquals(result, "Hello World");
});

// Edge Cases - Wrapping
Deno.test("Caesar Cipher - Encrypt with wrapping (shift 3)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "XYZ");
  assertEquals(result, "ABC");
});

Deno.test("Caesar Cipher - Decrypt with wrapping (shift 3)", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "ABC");
  assertEquals(result, "XYZ");
});

// Different Shift Values
Deno.test("Caesar Cipher - Encrypt with shift 1", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(1, "ABC");
  assertEquals(result, "BCD");
});

Deno.test("Caesar Cipher - Encrypt with shift 13 (ROT13)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(13, "HELLO");
  assertEquals(result, "URYYB");
});

Deno.test("Caesar Cipher - Encrypt with shift 25", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(25, "ABC");
  assertEquals(result, "ZAB");
});

Deno.test("Caesar Cipher - Decrypt with shift 1", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(1, "BCD");
  assertEquals(result, "ABC");
});

Deno.test("Caesar Cipher - Decrypt with shift 13 (ROT13)", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(13, "URYYB");
  assertEquals(result, "HELLO");
});

// Negative Shift Values
Deno.test("Caesar Cipher - Encrypt with negative shift", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(-3, "HELLO");
  assertEquals(result, "EBIIL");
});

Deno.test("Caesar Cipher - Decrypt with negative shift", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(-3, "EBIIL");
  assertEquals(result, "HELLO");
});

// Large Shift Values
Deno.test("Caesar Cipher - Encrypt with shift > 26", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(29, "ABC"); // 29 % 26 = 3
  assertEquals(result, "DEF");
});

Deno.test("Caesar Cipher - Decrypt with shift > 26", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(29, "DEF"); // 29 % 26 = 3
  assertEquals(result, "ABC");
});

Deno.test("Caesar Cipher - Encrypt with large negative shift", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(-29, "DEF"); // -29 % 26 = -3
  assertEquals(result, "ABC");
});

Deno.test("Caesar Cipher - Decrypt with large negative shift", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(-29, "ABC"); // -29 % 26 = -3
  assertEquals(result, "DEF");
});

// Special Characters and Numbers
Deno.test("Caesar Cipher - Encrypt preserves numbers", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "HELLO123");
  assertEquals(result, "KHOOR123");
});

Deno.test("Caesar Cipher - Encrypt preserves special characters", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "HELLO, WORLD!");
  assertEquals(result, "KHOOR, ZRUOG!");
});

Deno.test("Caesar Cipher - Encrypt preserves spaces and punctuation", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "Hello, World! 123");
  assertEquals(result, "Khoor, Zruog! 123");
});

// Empty and Single Character
Deno.test("Caesar Cipher - Encrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "");
  assertEquals(result, "");
});

Deno.test("Caesar Cipher - Decrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "");
  assertEquals(result, "");
});

Deno.test("Caesar Cipher - Encrypt single character", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "A");
  assertEquals(result, "D");
});

Deno.test("Caesar Cipher - Decrypt single character", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(3, "D");
  assertEquals(result, "A");
});

// Zero Shift
Deno.test("Caesar Cipher - Encrypt with shift 0", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(0, "HELLO WORLD");
  assertEquals(result, "HELLO WORLD");
});

Deno.test("Caesar Cipher - Decrypt with shift 0", () => {
  const cipher = new Cipher();
  const result = cipher.decryptCaesar(0, "HELLO WORLD");
  assertEquals(result, "HELLO WORLD");
});

// Shift equals alphabet length (identity)
Deno.test("Caesar Cipher - Encrypt with shift 26 (full rotation)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(26, "HELLO WORLD");
  assertEquals(result, "HELLO WORLD");
});

// Unicode/Emoji preservation
Deno.test("Caesar Cipher - Encrypt preserves emoji", () => {
  const cipher = new Cipher();
  const result = cipher.encryptCaesar(3, "HELLO 🎉 WORLD");
  assertEquals(result, "KHOOR 🎉 ZRUOG");
});

// Round-trip Tests
Deno.test("Caesar Cipher - Round-trip encrypt then decrypt", () => {
  const cipher = new Cipher();
  const original = "The Quick Brown Fox Jumps Over The Lazy Dog";
  const encrypted = cipher.encryptCaesar(7, original);
  const decrypted = cipher.decryptCaesar(7, encrypted);
  assertEquals(decrypted, original);
});

Deno.test("Caesar Cipher - Round-trip with special characters", () => {
  const cipher = new Cipher();
  const original = "Hello, World! 123 @#$";
  const encrypted = cipher.encryptCaesar(15, original);
  const decrypted = cipher.decryptCaesar(15, encrypted);
  assertEquals(decrypted, original);
});

// Negative shift regression tests
Deno.test("Caesar Cipher - Decrypt with negative shift", () => {
  const cipher = new Cipher();
  assertEquals(cipher.decryptCaesar(-3, "ABC"), "DEF");
  assertEquals(cipher.decryptCaesar(-1, "Abc"), "Bcd");
});

Deno.test("Caesar Cipher - Encrypt with negative shift preserves case", () => {
  const cipher = new Cipher();
  assertEquals(cipher.encryptCaesar(-3, "Hello, World! 1"), "Ebiil, Tloia! 1");
});

Deno.test("Caesar Cipher - Shift -26 is identity", () => {
  const cipher = new Cipher();
  assertEquals(cipher.encryptCaesar(-26, "Hello, World!"), "Hello, World!");
  assertEquals(cipher.decryptCaesar(-26, "Hello, World!"), "Hello, World!");
});

Deno.test("Caesar Cipher - Shift 52 is identity", () => {
  const cipher = new Cipher();
  assertEquals(cipher.encryptCaesar(52, "Hello, World!"), "Hello, World!");
  assertEquals(cipher.decryptCaesar(52, "Hello, World!"), "Hello, World!");
});

Deno.test("Caesar Cipher - Round-trip for shifts -60 to 60", () => {
  const cipher = new Cipher();
  const original = "The Quick Brown Fox, jumps over 13 lazy dogs! XYZ xyz";
  for (let shift = -60; shift <= 60; shift++) {
    const encrypted = cipher.encryptCaesar(shift, original);
    assertEquals(cipher.decryptCaesar(shift, encrypted), original, `decrypt(${shift})`);
    assertEquals(cipher.encryptCaesar(shift, cipher.decryptCaesar(shift, original)), original, `encrypt(${shift})`);
    assertEquals(encrypted, cipher.encryptCaesar(shift + 26, original), `equiv(${shift})`);
  }
});
