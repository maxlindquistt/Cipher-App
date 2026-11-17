import type { Ref } from 'react'
import Button from '../../../button/button'
import './outputField.css'

interface OutputFieldProps {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
  ref?: Ref<HTMLTextAreaElement>
}

/** Read-only result field plus its Copy action. Rendered as grid siblings, like InputField. */
function OutputField({ label, value, copied, onCopy, ref }: OutputFieldProps) {
  return (
    <>
      <label htmlFor="output-text" className="field-label workspace-out-label">{label}</label>
      <textarea
        ref={ref}
        id="output-text"
        name="output-text"
        className="text-field output-field workspace-out-text"
        placeholder="Result appears here as you type"
        value={value}
        readOnly
        spellCheck={false}
      />
      <div className="field-footer field-footer--end workspace-out-foot">
        <Button variant="primary" className="copy-button" onClick={onCopy} disabled={value === ''}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </>
  )
}

export default OutputField
