import React from 'react';
import './inputField.css';

function InputField(props: React.InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
    <div className="input-field-container">
      <h3>Plain text</h3>
      <textarea
          {...props}
          className="input-field"
      />
    </div>
    );
}

export default InputField;