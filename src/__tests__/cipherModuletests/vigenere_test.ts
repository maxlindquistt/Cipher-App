// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/// <reference lib="deno.ns" />
import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../../cipherModule/Cipher";

// Basic Encryption Tests
Deno.test("Vigenere Cipher - Encrypt with keyword 'KEY'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HELLO");
  assertEquals(result, "RIJVS");
});

Deno.test("Vigenere Cipher - Encrypt lowercase with keyword 'key'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("key", "hello");
  assertEquals(result, "rijvs");
});

Deno.test("Vigenere Cipher - Encrypt mixed case with keyword 'Key'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("Key", "Hello");
  assertEquals(result, "Rijvs");
});

Deno.test("Vigenere Cipher - Encrypt with keyword 'LEMON'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("LEMON", "ATTACKATDAWN");
  assertEquals(result, "LXFOPVEFRNHR");
});

// Basic Decryption Tests
Deno.test("Vigenere Cipher - Decrypt with keyword 'KEY'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("KEY", "RIJVS");
  assertEquals(result, "HELLO");
});

Deno.test("Vigenere Cipher - Decrypt lowercase with keyword 'key'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("key", "rijvs");
  assertEquals(result, "hello");
});

Deno.test("Vigenere Cipher - Decrypt mixed case with keyword 'Key'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("Key", "Rijvs");
  assertEquals(result, "Hello");
});

Deno.test("Vigenere Cipher - Decrypt with keyword 'LEMON'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("LEMON", "LXFOPVEFRNHR");
  assertEquals(result, "ATTACKATDAWN");
});

// Single Character Keyword
Deno.test("Vigenere Cipher - Encrypt with single character keyword 'A'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("A", "HELLO");
  assertEquals(result, "HELLO"); // 'A' = shift 0
});

Deno.test("Vigenere Cipher - Encrypt with single character keyword 'B'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("B", "HELLO");
  assertEquals(result, "IFMMP"); // 'B' = shift 1
});

Deno.test("Vigenere Cipher - Decrypt with single character keyword 'B'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("B", "IFMMP");
  assertEquals(result, "HELLO");
});

// Long Keywords
Deno.test("Vigenere Cipher - Encrypt with long keyword", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("SECRETKEY", "HELLO");
  assertEquals(result, "ZINCS");
});

Deno.test("Vigenere Cipher - Decrypt with long keyword", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("SECRETKEY", "ZINCS");
  assertEquals(result, "HELLO");
});

// Keyword Shorter Than Text (Repeating)
Deno.test("Vigenere Cipher - Encrypt with repeating keyword", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("ABC", "HELLOWORLD");
  assertEquals(result, "HFNLPYOSND");
});

Deno.test("Vigenere Cipher - Decrypt with repeating keyword", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("ABC", "HFNLPYOSND");
  assertEquals(result, "HELLOWORLD");
});

// Special Characters and Spaces
Deno.test("Vigenere Cipher - Encrypt preserves spaces", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HELLO WORLD");
  assertEquals(result, "RIJVS UYVJN");
});

Deno.test("Vigenere Cipher - Encrypt preserves punctuation", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HELLO, WORLD!");
  assertEquals(result, "RIJVS, UYVJN!");
});

Deno.test("Vigenere Cipher - Encrypt preserves numbers", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HELLO123");
  assertEquals(result, "RIJVS123");
});

Deno.test("Vigenere Cipher - Decrypt preserves spaces", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("KEY", "RIJVS UYVJN");
  assertEquals(result, "HELLO WORLD");
});

Deno.test("Vigenere Cipher - Decrypt preserves punctuation", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("KEY", "RIJVS, UYVJN!");
  assertEquals(result, "HELLO, WORLD!");
});

// Empty and Edge Cases
Deno.test("Vigenere Cipher - Encrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "");
  assertEquals(result, "");
});

Deno.test("Vigenere Cipher - Decrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("KEY", "");
  assertEquals(result, "");
});

Deno.test("Vigenere Cipher - Encrypt single character", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "H");
  assertEquals(result, "R");
});

Deno.test("Vigenere Cipher - Decrypt single character", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("KEY", "R");
  assertEquals(result, "H");
});

// Wrapping Around Alphabet
Deno.test("Vigenere Cipher - Encrypt with wrapping", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("XYZ", "ABC");
  assertEquals(result, "XZB");
});

Deno.test("Vigenere Cipher - Decrypt with wrapping", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("XYZ", "XZB");
  assertEquals(result, "ABC");
});

// Case Sensitivity in Text (Not Keyword)
Deno.test("Vigenere Cipher - Keyword case insensitive (uppercase keyword)", () => {
  const cipher = new Cipher();
  const result1 = cipher.encryptVigenere("KEY", "hello");
  const result2 = cipher.encryptVigenere("key", "hello");
  assertEquals(result1, result2);
});

Deno.test("Vigenere Cipher - Preserves text case", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HeLLo");
  assertEquals(result, "RiJVs");
});

// Round-trip Tests
Deno.test("Vigenere Cipher - Round-trip encrypt then decrypt", () => {
  const cipher = new Cipher();
  const original = "The Quick Brown Fox Jumps Over The Lazy Dog";
  const encrypted = cipher.encryptVigenere("SECRET", original);
  const decrypted = cipher.decryptVigenere("SECRET", encrypted);
  assertEquals(decrypted, original);
});

Deno.test("Vigenere Cipher - Round-trip with special characters", () => {
  const cipher = new Cipher();
  const original = "Hello, World! 123 @#$";
  const encrypted = cipher.encryptVigenere("KEYWORD", original);
  const decrypted = cipher.decryptVigenere("KEYWORD", encrypted);
  assertEquals(decrypted, original);
});

Deno.test("Vigenere Cipher - Round-trip with mixed case", () => {
  const cipher = new Cipher();
  const original = "HeLLo WoRLd";
  const encrypted = cipher.encryptVigenere("test", original);
  const decrypted = cipher.decryptVigenere("test", encrypted);
  assertEquals(decrypted, original);
});

// Complex Sentences
Deno.test("Vigenere Cipher - Encrypt complex sentence", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("CRYPTO", "MEET ME AT THE PARK");
  assertEquals(result, "OVCI FS CK RWX DCII");
});

Deno.test("Vigenere Cipher - Decrypt complex sentence", () => {
  const cipher = new Cipher();
  const result = cipher.decryptVigenere("CRYPTO", "OVCI FS CK RWX DCII");
  assertEquals(result, "MEET ME AT THE PARK");
});

// Unicode/Emoji preservation
Deno.test("Vigenere Cipher - Encrypt preserves emoji", () => {
  const cipher = new Cipher();
  const result = cipher.encryptVigenere("KEY", "HELLO 🎉 WORLD");
  assertEquals(result, "RIJVS 🎉 UYVJN");
});

