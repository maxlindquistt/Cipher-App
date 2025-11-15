# Manual Testing Checklist — Cipher Tool Application

Overview
- Goal: Verify that the UI and cipher implementations (Caesar, Vigenere, Atbash) behave correctly with common, edge, and UX cases.
- As extensive automated tests cover most cipher logic, this checklist focuses on manual verification of UI behavior and interactions.

How to use this document
- Follow each test step manually in the running app
- Mark Pass/Fail and add any notes or console output.

Run the frontend locally
```bash
# From repo root
npm install   # if not already installed
npm run dev   # or the project's dev command (Vite)
# Open the app in the browser (usually http://localhost:5173)
```

Quick automated test command (make sure Deno is installed):
```bash
deno test
```

## 1) Smoke test
- Steps:
  1. Open the app in a browser.
  2. Locate the Cipher Tool UI: input field, encode/decode toggle, cipher method dropdown, cipher options (shift / keyword), output field.
  3. Type "HELLO" into the input field.
  4. Ensure the output updates accordingly.
- Expected: The UI doesn't crash; fields accept input; output shows processed text.
- Severity: High

## 2) Mode toggle (Encode / Decode)
- Steps:
  1. Pick a cipher (Not atbash) and parameters, encode a string.
  2. Switch to Decode and provide the encoded text as input.
- Expected: Decoding returns the original text.

## 3) Options interaction tests (live update)
- Steps:
  1. With Caesar selected and input present, change the shift value via +/- or typing.
  2. Confirm the output updates immediately to reflect the new shift.
  3. With Vigenere selected and input present, change the keyword and confirm the output updates.
- Expected: Output updates on option changes (same behavior if using encode/decode toggle).

## 4) Edge cases
- Empty input -> Output should be empty.
- Non-alphabet characters -> should remain untouched (numbers, emojis, punctuation).

### Notes / Known quirks
- To run the automated tests, ensure Deno is installed and run `deno test`.

### Record results
- For each test: mark Pass/Fail, add notes and screenshots if helpful.

