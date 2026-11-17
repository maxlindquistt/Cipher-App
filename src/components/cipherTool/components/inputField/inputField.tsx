import type { Ref } from 'react'
import Button from '../../../button/button'
import './inputField.css'

interface InputFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  onClear: () => void
  ref?: Ref<HTMLTextAreaElement>
}

/**
 * Renders label, textarea and footer as siblings so the parent workspace
 * grid can place them. DOM order matches visual order at every breakpoint.
 */
function InputField({ label, value, onChange, onClear, ref }: InputFieldProps) {
  const count = value.length
  return (
    <>
      <label htmlFor="input-text" className="field-label workspace-in-label">{label}</label>
      <textarea
        ref={ref}
        id="input-text"
        name="input-text"
        className="text-field workspace-in-text"
        placeholder="Type or paste text…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        aria-describedby="input-count"
      />
      <div className="field-footer workspace-in-foot">
        <span id="input-count" className="field-meta">
          {count} {count === 1 ? 'character' : 'characters'}
        </span>
        <Button variant="secondary" onClick={onClear} disabled={count === 0}>
          Clear
        </Button>
      </div>
    </>
  )
}

export default InputField
