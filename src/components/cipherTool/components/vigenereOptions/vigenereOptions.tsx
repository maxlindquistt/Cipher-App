import './vigenereOptions.css'

interface VigenereOptionsProps {
  keyword: string
  onKeywordChange: (keyword: string) => void
}

function VigenereOptions({ keyword, onKeywordChange }: VigenereOptionsProps) {
  return (
    <div className="setting vigenere-options">
      <label htmlFor="key" className="setting-label">Keyword</label>
      <input
        type="text"
        id="key"
        name="key"
        className="key-input"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        aria-describedby="key-hint"
      />
      <p id="key-hint" className="setting-hint">
        Letters A–Z. Empty keyword leaves text unchanged.
      </p>
    </div>
  )
}

export default VigenereOptions
