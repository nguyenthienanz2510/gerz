import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign Up
        </h1>
        <p className='text-color-text-dark-secondary'>Let’s create your account</p>
        <form className='space-y-4 md:space-y-6' action='#'>
          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Your email'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
            />
          </div>
          <div>
            <input
              type='password'
              name='confirm_password'
              id='confirm_password'
              placeholder='Confirm password'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
            />
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
