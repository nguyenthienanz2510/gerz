import { InputHTMLAttributes } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
import classNames from 'classnames'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classNameError?: string
}

export default function Input({
  name,
  className,
  errorMessage,
  register,
  rules,
  classNameInput = classNames(
    'block w-full border bg-gray-100 h-10 px-3 text-color-text-dark ring-color-primary sm:text-sm',
    {
      'border-color-danger': errorMessage,
      'border-gray-300 focus:border-color-primary dark:border-gray-600  dark:focus:border-color-primary': !errorMessage
    }
  ),
  classNameError = 'mt-2 text-color-danger',
  ...rest
}: InputProps) {
  const registerResult = register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
}
