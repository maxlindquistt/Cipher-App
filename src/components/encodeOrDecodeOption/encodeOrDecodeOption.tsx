import type { CipherMode } from '../cipherTypes'
import './encodeOrDecodeOption.css'

interface EncodeOrDecodeOptionProps {
  value: CipherMode
  onChange: (value: CipherMode) => void
}

const MODES: ReadonlyArray<{ value: CipherMode; label: string }> = [
  { value: 'encode', label: 'Encode' },
  { value: 'decode', label: 'Decode' },
]

/** Encode/Decode segmented control built from a fieldset and native radios. */
function EncodeOrDecodeOption({ value, onChange }: EncodeOrDecodeOptionProps) {
  return (
    <fieldset className="setting mode-toggle">
      <legend className="setting-label">Mode</legend>
      <div className="mode-toggle-track">
        {MODES.map((mode) => (
          <label key={mode.value} className="mode-toggle-option">
            <input
              type="radio"
              name="cipher-mode"
              value={mode.value}
              checked={value === mode.value}
              onChange={() => onChange(mode.value)}
              className="visually-hidden"
            />
            <span>{mode.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default EncodeOrDecodeOption
