import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()

  const rules = getRules(getValues)

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign Up
        </h1>
        <p className='text-color-text-gray-dark dark:text-color-text-gray-light'>Let’s create your account</p>
        <form className='space-y-4 md:space-y-6' onSubmit={handleOnSubmit} noValidate>
          <div>
            <input
              type='email'
              placeholder='Your email'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
              {...register('email', rules.email)}
            />
            <div className='mt-2 text-color-danger'>{errors.email?.message}</div>
          </div>
          <div>
            <input
              type='password'
              autoComplete='on'
              placeholder='Password'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
              {...register('password', rules.password)}
            />
            <div className='mt-2 text-color-danger'>{errors.password?.message}</div>
          </div>
          <div>
            <input
              type='password'
              autoComplete='on'
              placeholder='Confirm password'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
              {...register('confirm_password', rules.confirm_password)}
            />
            <div className='mt-2 text-color-danger'>{errors.confirm_password?.message}</div>
          </div>
          <button
            type='submit'
            className='w-full rounded-lg bg-color-primary px-5 py-2.5 text-center text-sm text-color-text-light transition-all hover:bg-color-primary-active focus:bg-color-primary-active'
          >
            Register
          </button>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Already have an account?{' '}
            <Link to={'/login'}>
              <span className='text-color-primary transition-all hover:underline'>Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
