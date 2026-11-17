import type { ButtonHTMLAttributes } from 'react'
import './button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

/** Shared button. Defaults to type="button" so it never submits a form by accident. */
function Button({ variant = 'secondary', className, type = 'button', ...rest }: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
  return <button {...rest} type={type} className={classes} />
}

export default Button
