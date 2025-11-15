import React from 'react';
import './outputField.css';

function OutputField(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="output-field-container">
            <h3>Encrypted text</h3>
            <textarea
                {...props}
                className="output-field"
            />
        </div>
    );
}

export default OutputField;
