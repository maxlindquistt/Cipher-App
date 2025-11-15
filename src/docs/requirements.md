# Requirements — Cipher Tool App

This document lists the functional and non-functional requirements for the Cipher Tool web application.

## 1. High-level summary
- Provide an interactive UI to encode/decode text using classic ciphers (Caesar, Vigenère, Atbash).
- Allow users to adjust parameters (Caesar shift, Vigenère keyword) and immediately see results.
- Preserve text case and non-alphabet characters (numbers, punctuation, spaces).

## 2. Actors / Users
- Learner: wants to encode/decode example strings and explore parameters.
- Educator: demonstrates ciphers and shows examples.
- Developer / Tester: verifies algorithm correctness and integration.

## 3. Functional requirements

FR1 — Input/Output
- The UI shall provide a text input field for plaintext/ciphertext and a read-only output field for results.

FR2 — Mode selection
- The UI shall provide an Encode / Decode toggle. Changing the mode switches processing direction.

FR3 — Cipher selection
- The UI shall provide a dropdown to select between `Caesar`, `Vigenere`, and `Atbash`.

FR4 — Cipher parameters
- For Caesar: provide a numeric `shift` input (supports typing and +/- buttons).
- For Vigenère: provide a `keyword` text input.
- For Atbash: no parameters required.

FR5 — Live update
- When input text or any parameter changes, the output must update automatically.

FR6 — Preservation rules
- Letters: preserve case (uppercase stays uppercase, lowercase stays lowercase).
- Non-letter characters: numbers, punctuation, spaces and emojis must stay unchanged.

## 4. Non-functional requirements

NFR1 — Performance
- The app must process inputs instantly.

NFR2 — Reliability
- All cipher algorithms must be covered by automated unit tests (currently 102 tests across Caesar, Vigenère, Atbash).

NFR3 — Maintainability
- Code should be modular (separate cipher implementations, UI components) and covered by tests.

## 5. Data shapes and contracts
- Input: plain string.
- Output: processed string (same length, non-letter characters preserved).
- Parameters: Caesar shift (integer, can be negative or >26), Vigenère keyword (string of letters).

Error handling and edge cases
- Empty input -> empty output.
- Empty Vigenère keyword -> treat as no-shift.

## 6. Acceptance criteria (testable)
- AC1: Caesar encrypt(3, "HELLO WORLD") -> "KHOOR ZRUOG" (unit test must pass)
- AC2: Caesar decrypt(3, "KHOOR ZRUOG") -> "HELLO WORLD"
- AC3: Vigenère encrypt("KEY", "HELLO") -> "RIJVS" and decrypt back to "HELLO" (unit test)
- AC4: Atbash encrypt("ABC") -> "ZYX" and symmetric decrypt
- AC5: Changing shift/keyword updates output when input present (UI manual test)

## 7. Test vectors

Caesar
- (shift=3) HELLO WORLD -> KHOOR ZRUOG
- (shift=29) ABC -> DEF
- (shift=-3) HELLO -> EBIIL

Vigenère
- keyword=KEY, HELLO -> RIJVS
- keyword=LEMON, ATTACKATDAWN -> LXFOPVEFRNHR
- keyword=ABC, HELLOWORLD -> HFNLPYOSND

Atbash
- ABC -> ZYX
- HELLO -> SVOOL

## 8. Developer notes
- Tests run with Deno (make sure Deno is installed): use `deno test` to run unit tests.
- Editor may show TS errors for test files; Deno's runtime includes test types via triple-slash directive (e.g. `/// <reference lib="deno.ns" />`).
