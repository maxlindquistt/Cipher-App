import './vigenereOptions.css';

interface VigenereOptionsProps {
    keyword: string;
    onKeywordChange: (keyword: string) => void;
}

function VigenereOptions({ keyword, onKeywordChange }: VigenereOptionsProps) {
    return (
        <div className="vigenere-options">
            <label htmlFor="key" className="key-label">Keyword:</label>
            <input 
                type="text" 
                id="key" 
                className="key-input"
                placeholder="Enter keyword..."
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
            />
        </div>
    )
}

export default VigenereOptions;