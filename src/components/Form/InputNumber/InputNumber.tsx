import { forwardRef, InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = ` block w-full rounded-lg border 
  bg-gray-50 p-2.5 text-color-text-dark ring-color-primary 
   dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 
   dark:focus:ring-color-primary sm:text-sm ${
     errorMessage
       ? 'border-color-danger'
       : 'focus:border-color border-gray-300 focus:border-color-primary dark:border-gray-600  dark:focus:border-color-primary'
   }`,
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
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
