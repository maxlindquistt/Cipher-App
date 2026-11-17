import type { ReactNode } from 'react'
import type { CipherId } from '../cipherTypes'
import './informationCard.css'

interface InformationCardProps {
  selectedCipher: CipherId
}

interface CipherInfo {
  name: string
  description: ReactNode
  example: { input: string; output: string; note: string }
  /** Cipher-specific items appended to the General notes list. */
  extraNotes?: ReadonlyArray<string>
}

const CIPHER_INFO: Record<CipherId, CipherInfo> = {
  caesar: {
    name: 'Caesar',
    description: (
      <>
        <p>
          Each letter moves a fixed number of places along the alphabet. That number is
          the <strong>shift</strong>, and it wraps around, so with a shift of 3 the
          letter Z becomes C.
        </p>
        <p>To decode, the same shift is applied backwards.</p>
      </>
    ),
    example: { input: 'HELLO', output: 'KHOOR', note: 'shift 3' },
  },
  vigenere: {
    name: 'Vigenère',
    description: (
      <>
        <p>
          A <strong>keyword</strong> sets a different shift for each letter: A shifts by
          0, B by 1, and so on. The keyword repeats along the text and skips anything
          that isn't a letter.
        </p>
        <p>Longer keywords hide patterns better. Decoding needs the same keyword.</p>
      </>
    ),
    example: { input: 'HELLO', output: 'RIJVS', note: 'keyword KEY' },
    extraNotes: ['An empty keyword leaves the text unchanged.'],
  },
  atbash: {
    name: 'Atbash',
    description: (
      <>
        <p>
          The alphabet is reversed: A becomes Z, B becomes Y, and so on. There is no key.
        </p>
        <p>Encoding and decoding are the same operation, so applying it twice gives back the original text.</p>
      </>
    ),
    example: { input: 'HELLO', output: 'SVOOL', note: 'no key' },
  },
}

function InformationCard({ selectedCipher }: InformationCardProps) {
  const info = CIPHER_INFO[selectedCipher]

  return (
    <aside className="information-card" aria-labelledby="info-title">
      <h2 id="info-title" className="information-card-title">
        How the {info.name} cipher works
      </h2>

      <div className="information-card-body">{info.description}</div>

      <figure className="information-card-example">
        <figcaption className="information-card-example-caption">
          Example ({info.example.note})
        </figcaption>
        <p className="information-card-example-text">
          <span>{info.example.input}</span>
          <span aria-hidden="true"> → </span>
          <span className="visually-hidden"> becomes </span>
          <span>{info.example.output}</span>
        </p>
      </figure>

      <details className="information-card-notes">
        <summary>General notes</summary>
        <ul>
          <li>Switch between <strong>Encode</strong> and <strong>Decode</strong> to encrypt or decrypt.</li>
          <li>Numbers, spaces and punctuation stay unchanged.</li>
          <li>Case is preserved (HELLO → KHOOR, not khoor).</li>
          <li>
            This tool uses the <strong>English alphabet (A–Z)</strong>. Characters outside
            this range are treated as non-alphabetic characters.
          </li>
          {info.extraNotes?.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </details>
    </aside>
  )
}

export default InformationCard
