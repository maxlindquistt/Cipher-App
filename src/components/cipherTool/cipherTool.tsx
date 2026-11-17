import { useEffect, useRef, useState } from 'react'
import InputField from './components/inputField/inputField'
import OutputField from './components/outputField/outputField'
import EncodeOrDecodeOption from '../encodeOrDecodeOption/encodeOrDecodeOption'
import Dropdown from '../dropdown/dropdown'
import VigenereOptions from './components/vigenereOptions/vigenereOptions'
import CaesarOptions from './components/caesarOptions/caesarOptions'
import Button from '../button/button'
import {
  CIPHER_OPTIONS,
  isCipherId,
  parseShift,
  runCipher,
  type CipherId,
  type CipherMode,
  type CipherSettings,
} from '../cipherTypes'
import './cipherTool.css'

interface CipherToolProps {
  selectedCipher: CipherId
  onCipherChange: (cipher: CipherId) => void
}

const ANNOUNCE_DELAY_MS = 500
const ANNOUNCE_FULL_TEXT_MAX = 200
const COPIED_RESET_MS = 2000

function describeOutput(output: string): string {
  return output.length <= ANNOUNCE_FULL_TEXT_MAX
    ? output
    : `Output updated, ${output.length} characters`
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M7 4 3 8l4 4" />
      <path d="M3 8h14" />
      <path d="m17 20 4-4-4-4" />
      <path d="M21 16H7" />
    </svg>
  )
}

function CipherTool({ selectedCipher, onCipherChange }: CipherToolProps) {
  const [mode, setMode] = useState<CipherMode>('encode')
  const [shiftText, setShiftText] = useState('3')
  const [keyword, setKeyword] = useState('')
  const [inputText, setInputText] = useState('')
  const [copied, setCopied] = useState(false)
  const [announcement, setAnnouncement] = useState({ text: '', id: 0 })

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLTextAreaElement>(null)
  const skipNextOutputAnnouncement = useRef(false)
  const copiedTimer = useRef<number | undefined>(undefined)

  const settings: CipherSettings = {
    cipher: selectedCipher,
    mode,
    shift: parseShift(shiftText),
    keyword,
  }
  // Derived on every render, so an empty input always gives an empty output.
  const outputText = runCipher(inputText, settings)

  // Reset the "Copied" label as soon as the result changes. Adjusting state
  // during render (rather than in an effect) avoids an extra committed render:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [copiedResetFor, setCopiedResetFor] = useState(outputText)
  if (copiedResetFor !== outputText) {
    setCopiedResetFor(outputText)
    setCopied(false)
  }

  const announce = (text: string) => {
    // The id toggles a trailing no-break space so repeated messages are re-announced.
    setAnnouncement((prev) => ({ text, id: prev.id + 1 }))
  }

  // Debounced live-region update for the output.
  useEffect(() => {
    if (skipNextOutputAnnouncement.current) {
      skipNextOutputAnnouncement.current = false
      return
    }
    if (outputText === '') return
    const timer = window.setTimeout(() => announce(describeOutput(outputText)), ANNOUNCE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [outputText])

  // Clear the pending "Copied" reset timer on unmount.
  useEffect(() => () => window.clearTimeout(copiedTimer.current), [])

  const handleCipherChange = (value: string) => {
    if (isCipherId(value)) onCipherChange(value)
  }

  const handleClear = () => {
    setInputText('')
    // The Clear button becomes disabled, so move focus somewhere useful.
    inputRef.current?.focus()
  }

  const handleSwap = () => {
    const nextMode: CipherMode = mode === 'encode' ? 'decode' : 'encode'
    const nextOutput = runCipher(outputText, { ...settings, mode: nextMode })
    skipNextOutputAnnouncement.current = nextOutput !== outputText
    setInputText(outputText)
    setMode(nextMode)
    announce(`Swapped. Now ${nextMode === 'encode' ? 'encoding' : 'decoding'}.`)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      announce('Copied to clipboard')
      window.clearTimeout(copiedTimer.current)
      copiedTimer.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS)
    } catch {
      outputRef.current?.select()
      announce('Copy failed. The result is selected, press Control C or Command C to copy.')
    }
  }

  const isEncode = mode === 'encode'

  return (
    <section className="cipher-tool" aria-labelledby="tool-title">
      <h2 id="tool-title" className="visually-hidden">Cipher workspace</h2>

      <div className="settings-bar" role="group" aria-label="Settings">
        <Dropdown
          id="cipher"
          label="Cipher"
          options={CIPHER_OPTIONS}
          value={selectedCipher}
          onChange={(e) => handleCipherChange(e.target.value)}
        />

        <EncodeOrDecodeOption value={mode} onChange={setMode} />

        <div className="key-slot">
          {selectedCipher === 'caesar' && (
            <CaesarOptions value={shiftText} onChange={setShiftText} />
          )}
          {selectedCipher === 'vigenere' && (
            <VigenereOptions keyword={keyword} onKeywordChange={setKeyword} />
          )}
          {selectedCipher === 'atbash' && (
            <p className="setting-hint key-slot-note">No key needed: A↔Z, B↔Y…</p>
          )}
        </div>
      </div>

      <div className="workspace">
        <InputField
          ref={inputRef}
          label={isEncode ? 'Plain text' : 'Cipher text'}
          value={inputText}
          onChange={setInputText}
          onClear={handleClear}
        />

        <Button
          variant="secondary"
          className="swap-button workspace-swap"
          onClick={handleSwap}
          disabled={outputText === ''}
          aria-label="Swap input and output"
        >
          <SwapIcon />
          <span className="swap-button-text">Swap</span>
        </Button>

        <OutputField
          ref={outputRef}
          label={isEncode ? 'Encoded text' : 'Decoded text'}
          value={outputText}
          copied={copied}
          onCopy={handleCopy}
        />
      </div>

      <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {announcement.text}
        {announcement.id % 2 === 1 ? ' ' : ''}
      </div>
    </section>
  )
}

export default CipherTool
