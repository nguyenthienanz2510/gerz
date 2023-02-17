import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Form/Input'
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
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign Up
        </h1>
        <p className='text-color-text-gray-dark dark:text-color-text-gray-light'>Let’s create your account</p>
        <form className='space-y-4 md:space-y-6' onSubmit={handleOnSubmit} noValidate>
          <Input
            name='email'
            type='email'
            placeholder='Your email'
            register={register}
            rules={rules.email}
            errorMessage={errors.email?.message}
          />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='on'
            register={register}
            rules={rules.password}
            errorMessage={errors.password?.message}
          />
          <Input
            name='confirm_password'
            type='password'
            placeholder='Confirm password'
            autoComplete='on'
            register={register}
            rules={rules.confirm_password}
            errorMessage={errors.confirm_password?.message}
          />
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
