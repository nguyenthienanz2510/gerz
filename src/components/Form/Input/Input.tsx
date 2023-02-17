import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  className?: string
  autoComplete?: string
  errorMessage?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  name,
  placeholder,
  className,
  autoComplete,
  errorMessage,
  register,
  rules
}: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={` block w-full rounded-lg border 
        bg-gray-50 p-2.5 text-color-text-dark ring-color-primary 
         dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 
         dark:focus:ring-color-primary sm:text-sm ${
           errorMessage
             ? 'border-color-danger'
             : 'focus:border-color border-gray-300 focus:border-color-primary dark:border-gray-600  dark:focus:border-color-primary'
         }`}
        {...register(name, rules)}
      />
      <div className='mt-2 text-color-danger'>{errorMessage}</div>
    </div>
  )
}
