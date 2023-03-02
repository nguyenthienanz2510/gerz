import { forwardRef, InputHTMLAttributes } from 'react'
import type { RegisterOptions } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
  showError?: boolean
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = ` block w-full border 
    bg-gray-100 h-10 px-3 text-color-text-dark ring-color-primary 
    sm:text-sm ${
      errorMessage
        ? 'border-color-danger'
        : 'border-gray-300 focus:border-color-primary dark:border-gray-600  dark:focus:border-color-primary'
    }`,
    showError,
    classNameError = 'mt-2 text-color-danger',
    onchange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onchange) {
      onchange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} ref={ref} />
      {showError && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
})

export default InputNumber
