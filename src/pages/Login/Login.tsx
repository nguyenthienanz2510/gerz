import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign in to your account
        </h1>
        <form className='space-y-4 md:space-y-6' action='#'>
          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Your email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
              placeholder='name@company.com'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='focus:border-color block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-color-text-dark ring-color-primary focus:border-color-primary dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary sm:text-sm'
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-start'>
              <div className='flex h-5 items-center'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  type='checkbox'
                  className='focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                  required
                />
              </div>
              <div className='ml-3 text-sm'>
                <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                  Remember me
                </label>
              </div>
            </div>
            <Link to={'forgot-password'}>Forgot password?</Link>
          </div>
          <button
            type='submit'
            className='w-full rounded-lg bg-color-primary px-5 py-2.5 text-center text-sm text-color-text-light transition-all hover:bg-color-primary-active focus:bg-color-primary-active'
          >
            Sign in
          </button>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Don’t have an account yet? <Link to={'/register'}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
