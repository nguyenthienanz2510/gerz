import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  type,
  name,
  placeholder,
  className,
  autoComplete,
  errorMessage,
  register,
  rules,
  classNameInput = ` block w-full rounded-lg border 
  bg-gray-50 p-2.5 text-color-text-dark ring-color-primary 
   dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 
   dark:focus:ring-color-primary sm:text-sm ${
     errorMessage
       ? 'border-color-danger'
       : 'focus:border-color border-gray-300 focus:border-color-primary dark:border-gray-600  dark:focus:border-color-primary'
   }`,
  classNameError = 'mt-2 text-color-danger'
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={classNameInput}
        {...registerResult}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
