import React from 'react';
import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

function Button(props: ButtonProps) {
    const { text, ...rest } = props;
    return (
        <button
            {...rest}
            className="button"
        >
            {text}
        </button>
    );
}




export default Button;