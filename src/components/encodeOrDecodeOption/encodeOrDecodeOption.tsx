import React from 'react';
import './encodeOrDecodeOption.css';

interface EncodeOrDecodeOptionProps {
    value?: 'encode' | 'decode';
    onChange?: (value: 'encode' | 'decode') => void;
}

function EncodeOrDecodeOption({ value, onChange }: EncodeOrDecodeOptionProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value as 'encode' | 'decode');
        }
    };

    return (
        <div className="encode-decode-container">
            <div className="encode-decode-options">
                <label className="encode-decode-label">
                    <input 
                        type="radio" 
                        name="encode-decode" 
                        value="encode"
                        checked={value === 'encode'}
                        onChange={handleChange}
                    />
                    <span>Encode</span>
                </label>
                <label className="encode-decode-label">
                    <input 
                        type="radio" 
                        name="encode-decode" 
                        value="decode"
                        checked={value === 'decode'}
                        onChange={handleChange}
                    />
                    <span>Decode</span>
                </label>
            </div>
        </div>
    );
}

export default EncodeOrDecodeOption;
