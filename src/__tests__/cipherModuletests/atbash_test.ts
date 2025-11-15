// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/// <reference lib="deno.ns" />
import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../../cipherModule/Cipher";

// Basic Encryption Tests
Deno.test("Atbash Cipher - Encrypt simple text", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("HELLO");
  assertEquals(result, "SVOOL");
});

Deno.test("Atbash Cipher - Encrypt lowercase text", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("hello");
  assertEquals(result, "svool");
});

Deno.test("Atbash Cipher - Encrypt mixed case text", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("Hello");
  assertEquals(result, "Svool");
});

Deno.test("Atbash Cipher - Encrypt alphabet (A-Z)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  assertEquals(result, "ZYXWVUTSRQPONMLKJIHGFEDCBA");
});

Deno.test("Atbash Cipher - Encrypt reverse alphabet (Z-A)", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("ZYXWVUTSRQPONMLKJIHGFEDCBA");
  assertEquals(result, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
});

// Basic Decryption Tests
Deno.test("Atbash Cipher - Decrypt simple text", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("SVOOL");
  assertEquals(result, "HELLO");
});

Deno.test("Atbash Cipher - Decrypt lowercase text", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("svool");
  assertEquals(result, "hello");
});

Deno.test("Atbash Cipher - Decrypt mixed case text", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("Svool");
  assertEquals(result, "Hello");
});

// Symmetric Property (Encrypt = Decrypt)
Deno.test("Atbash Cipher - Encrypt and decrypt are symmetric", () => {
  const cipher = new Cipher();
  const encrypted = cipher.encryptAtbash("HELLO");
  const decrypted = cipher.decryptAtbash(encrypted);
  assertEquals(decrypted, "HELLO");
});

Deno.test("Atbash Cipher - Double encryption returns original", () => {
  const cipher = new Cipher();
  const original = "HELLO WORLD";
  const encrypted = cipher.encryptAtbash(original);
  const doubleEncrypted = cipher.encryptAtbash(encrypted);
  assertEquals(doubleEncrypted, original);
});

// Edge Cases - Single Characters
Deno.test("Atbash Cipher - Encrypt 'A' becomes 'Z'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("A");
  assertEquals(result, "Z");
});

Deno.test("Atbash Cipher - Encrypt 'Z' becomes 'A'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("Z");
  assertEquals(result, "A");
});

Deno.test("Atbash Cipher - Encrypt 'M' becomes 'N'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("M");
  assertEquals(result, "N");
});

Deno.test("Atbash Cipher - Encrypt 'N' becomes 'M'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("N");
  assertEquals(result, "M");
});

// Special Characters and Spaces
Deno.test("Atbash Cipher - Encrypt preserves spaces", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("HELLO WORLD");
  assertEquals(result, "SVOOL DLIOW");
});

Deno.test("Atbash Cipher - Encrypt preserves punctuation", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("HELLO, WORLD!");
  assertEquals(result, "SVOOL, DLIOW!");
});

Deno.test("Atbash Cipher - Encrypt preserves numbers", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("HELLO123");
  assertEquals(result, "SVOOL123");
});

Deno.test("Atbash Cipher - Encrypt with special characters", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("TEST@#$123");
  assertEquals(result, "GVHG@#$123");
});

Deno.test("Atbash Cipher - Decrypt preserves spaces", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("SVOOL DLIOW");
  assertEquals(result, "HELLO WORLD");
});

Deno.test("Atbash Cipher - Decrypt preserves punctuation", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("SVOOL, DLIOW!");
  assertEquals(result, "HELLO, WORLD!");
});

// Empty and Single Character
Deno.test("Atbash Cipher - Encrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("");
  assertEquals(result, "");
});

Deno.test("Atbash Cipher - Decrypt empty string", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("");
  assertEquals(result, "");
});

Deno.test("Atbash Cipher - Encrypt single character 'X'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("X");
  assertEquals(result, "C");
});

Deno.test("Atbash Cipher - Decrypt single character 'C'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("C");
  assertEquals(result, "X");
});

// Case Preservation
Deno.test("Atbash Cipher - Preserves uppercase", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("ABC");
  assertEquals(result, "ZYX");
});

Deno.test("Atbash Cipher - Preserves lowercase", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("abc");
  assertEquals(result, "zyx");
});

Deno.test("Atbash Cipher - Preserves mixed case", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("AbC");
  assertEquals(result, "ZyX");
});

// Round-trip Tests
Deno.test("Atbash Cipher - Round-trip encrypt then decrypt", () => {
  const cipher = new Cipher();
  const original = "The Quick Brown Fox Jumps Over The Lazy Dog";
  const encrypted = cipher.encryptAtbash(original);
  const decrypted = cipher.decryptAtbash(encrypted);
  assertEquals(decrypted, original);
});

Deno.test("Atbash Cipher - Round-trip with special characters", () => {
  const cipher = new Cipher();
  const original = "Hello, World! 123 @#$";
  const encrypted = cipher.encryptAtbash(original);
  const decrypted = cipher.decryptAtbash(encrypted);
  assertEquals(decrypted, original);
});

Deno.test("Atbash Cipher - Round-trip with mixed case", () => {
  const cipher = new Cipher();
  const original = "HeLLo WoRLd";
  const encrypted = cipher.encryptAtbash(original);
  const decrypted = cipher.decryptAtbash(encrypted);
  assertEquals(decrypted, original);
});

// Common Words
Deno.test("Atbash Cipher - Encrypt 'TEST'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("TEST");
  assertEquals(result, "GVHG");
});

Deno.test("Atbash Cipher - Encrypt 'WIZARD'", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("WIZARD");
  assertEquals(result, "DRAZIW");
});

Deno.test("Atbash Cipher - Decrypt 'GVHG'", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("GVHG");
  assertEquals(result, "TEST");
});

// Complex Sentences
Deno.test("Atbash Cipher - Encrypt complex sentence", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("MEET ME AT THE PARK");
  assertEquals(result, "NVVG NV ZG GSV KZIP");
});

Deno.test("Atbash Cipher - Decrypt complex sentence", () => {
  const cipher = new Cipher();
  const result = cipher.decryptAtbash("NVVG NV ZG GSV KZIP");
  assertEquals(result, "MEET ME AT THE PARK");
});

// Palindromes in Atbash
Deno.test("Atbash Cipher - Check if any letters are self-encrypting", () => {
  const cipher = new Cipher();
  // In Atbash, no letters encrypt to themselves since it reverses the alphabet
  const result = cipher.encryptAtbash("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  assertEquals(result, "ZYXWVUTSRQPONMLKJIHGFEDCBA");
});

// Unicode/Emoji preservation
Deno.test("Atbash Cipher - Encrypt preserves emoji", () => {
  const cipher = new Cipher();
  const result = cipher.encryptAtbash("HELLO 🎉 WORLD");
  assertEquals(result, "SVOOL 🎉 DLIOW");
});

