import './informationCard.css';

function InformationCard() {
    return (
        <div className="information-card">
            <h2>How to Use</h2>
            <p>
                This tool lets you encode and decode text using classic ciphers. 
                Type your text in the input field and watch it transform in real-time!
            </p>
            
            <h3>Available Ciphers</h3>
            <ul>
                <li>
                    <strong>Caesar Cipher:</strong> Shifts each letter by a fixed number of positions. 
                    Try different shift values to see how it changes the output.
                </li>
                <li>
                    <strong>Vigenère Cipher:</strong> Uses a keyword to shift letters by different amounts. 
                    Longer keywords make stronger encryption.
                </li>
                <li>
                    <strong>Atbash Cipher:</strong> Reverses the alphabet (A↔Z, B↔Y, etc.). 
                    Simple but effective for basic encoding.
                </li>
            </ul>
            
            <h3>Quick Tips And Notes</h3>
            <ul>
                <li>Switch between <strong>Encode</strong> and <strong>Decode</strong> to encrypt or decrypt</li>
                <li>Numbers, spaces, and punctuation stay unchanged</li>
                <li>Case is preserved (HELLO → KHOOR, not khoor)</li>
                <li>This tool uses the <strong>English alphabet (A-Z)</strong>, characters outside this range are treated as non-alphabetic characters</li>
            </ul>
        </div>
    );
}

export default InformationCard;
