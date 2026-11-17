import type { ChangeEvent } from 'react'
import { parseShift, wrapShift } from '../../../cipherTypes'
import './caesarOptions.css'

interface CaesarOptionsProps {
  /** Raw field text. May be empty while the user is typing. */
  value: string
  onChange: (value: string) => void
}

function letterAt(index: number): string {
  return String.fromCharCode(65 + index)
}

function CaesarOptions({ value, onChange }: CaesarOptionsProps) {
  const shift = parseShift(value)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\D/g, '').slice(0, 2))
  }

  return (
    <div className="setting caesar-options">
      <label htmlFor="shift" className="setting-label">Shift</label>
      <div className="shift-control">
        <button
          type="button"
          className="btn btn--secondary shift-button"
          onClick={() => onChange(String(wrapShift(shift - 1)))}
          aria-label="Decrease shift"
          aria-controls="shift"
        >
          <span aria-hidden="true">−</span>
        </button>
        <input
          type="text"
          id="shift"
          name="shift"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={2}
          autoComplete="off"
          value={value}
          onChange={handleInputChange}
          onBlur={() => onChange(String(shift))}
          aria-describedby="shift-hint"
          className="shift-input"
        />
        <button
          type="button"
          className="btn btn--secondary shift-button"
          onClick={() => onChange(String(wrapShift(shift + 1)))}
          aria-label="Increase shift"
          aria-controls="shift"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      <p id="shift-hint" className="setting-hint" aria-live="polite">
        <span aria-hidden="true">A → {letterAt(shift)}</span>
        <span className="visually-hidden">A becomes {letterAt(shift)}</span>
      </p>
    </div>
  )
}

export default CaesarOptions
