import type { SelectHTMLAttributes } from 'react'
import './dropdown.css'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string
  label: string
  options: ReadonlyArray<DropdownOption>
}

/** Labelled native select with a custom chevron. */
function Dropdown({ id, label, options, className, ...rest }: DropdownProps) {
  return (
    <div className="setting dropdown-container">
      <label htmlFor={id} className="setting-label">{label}</label>
      <select {...rest} id={id} className={['dropdown', className].filter(Boolean).join(' ')}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
