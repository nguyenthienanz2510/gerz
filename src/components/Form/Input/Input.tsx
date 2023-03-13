import { InputHTMLAttributes, useState } from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
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
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null
  const handleType = () => {
    if (rest.type === 'password') {
      return openEye ? 'text' : 'password'
    } else {
      return rest.type
    }
  }
  return (
    <div className={className + ` relative`}>
      <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
      <div
        aria-hidden
        onClick={() => {
          setOpenEye((prev) => !prev)
        }}
        className='absolute top-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center transition-all hover:text-color-primary'
      >
        {openEye && rest.type === 'password' && <FontAwesomeIcon icon={faEye} />}
        {!openEye && rest.type === 'password' && <FontAwesomeIcon icon={faEyeSlash} />}
      </div>
    </div>
  )
}
