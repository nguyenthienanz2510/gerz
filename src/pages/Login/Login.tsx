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
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
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
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
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
            className='focus:ring-primary-300 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700'
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
