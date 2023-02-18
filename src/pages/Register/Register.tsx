import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Form/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const handleOnSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    console.log(body)
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-5'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Sign Up
        </h1>
        <p className='text-color-text-gray-dark dark:text-color-text-gray-light'>Let’s create your account</p>
        <form className='space-y-4 md:space-y-5' onSubmit={handleOnSubmit} noValidate>
          <Input
            name='email'
            type='email'
            placeholder='Your email'
            register={register}
            errorMessage={errors.email?.message}
          />
          <Input
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='on'
            register={register}
            errorMessage={errors.password?.message}
          />
          <Input
            name='confirm_password'
            type='password'
            placeholder='Confirm password'
            autoComplete='on'
            register={register}
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
