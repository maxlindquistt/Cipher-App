# Cipher Tool

An interactive web application for encoding and decoding text using classic cryptographic ciphers. Built for educational purposes to demonstrate fundamental encryption algorithms and clean code principles.

## About

This project was created as a learning exercise as a part of the course '1DV610' at Linnaeus University. It features three classic ciphers: Caesar, Vigenère, and Atbash, allowing users to encode and decode messages with adjustable parameters.

## Features

- **Three Classic Ciphers**
  - Caesar Cipher with adjustable shift values
  - Vigenère Cipher with custom keywords
  - Atbash Cipher (alphabet reversal)

- **Live Encoding/Decoding**
  - Real-time output as you type
  - Toggle between encode and decode modes
  - Preserves case, numbers, and punctuation

- **Interactive Controls**
  - Intuitive cipher selection dropdown
  - Parameter controls (shift buttons, keyword input)

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Testing:** Deno (102 comprehensive unit tests)
- **Styling:** CSS with custom component styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Deno (for running tests)

### Installation

```bash
# Clone the repository
git clone https://github.com/MaxLindquistLnu/L3.git
cd L3

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Running Tests

```bash
# Run all unit tests with Deno
deno test

# Run specific test file
deno test src/__tests__/cipherModuletests/caesar_test.ts
```

## Project Structure

```
src/
├── components/          # React UI components
│   ├── cipherTool/     # Main cipher tool component
│   ├── button/         # Reusable button component
│   ├── dropdown/       # Cipher selection dropdown
│   └── ...
├── cipherModule/       # Cipher algorithm implementations
│   ├── CaesarCipher.ts
│   ├── VigenereCipher.ts
│   └── AtbashCipher.ts
├── __tests__/          # Test suites
│   ├── cipherModuletests/  # Unit tests
│   └── manualTests/        # Manual testing checklist
└── docs/               # Documentation
    ├── vision.md
    ├── requirements.md
    └── reflection.md
```

## How It Works

1. **Enter your text** in the input field
2. **Select a cipher** from the dropdown menu
3. **Adjust parameters** (shift value or keyword)
4. **Toggle encode/decode** mode
5. **View the result** in the output field instantly


## Documentation

- [Vision](src/docs/vision.md) - Project goals and roadmap
- [Requirements](src/docs/requirements.md) - Functional and non-functional requirements
- [Reflection](src/docs/reflection.md) - Clean Code principles applied
- [Manual Tests](src/__tests__/manualTests/testingChecklist.md) - Testing checklist

## Future Enhancements

- Additional ciphers (Playfair, Hill, etc.)
- Copy-to-clipboard functionality
- Example presets and tutorials

## Acknowledgments

- Built following principles from "Clean Code" by Robert C. Martin
- Cipher algorithms based on classical cryptography


