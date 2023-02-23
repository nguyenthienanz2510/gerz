import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Form/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import Button from 'src/components/Button'
import path from 'src/constant/path'
import authApi from 'src/apis/auth.api'

type FormData = Omit<Schema, 'confirm_password'>

const loginSchema = schema.omit(['confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setUserProfile } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const handleOnSubmit = handleSubmit((data) => {
    const body = data
    console.log(body)
    loginAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUserProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
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
          Sign in to your account
        </h1>
        <p className='text-color-text-gray-dark dark:text-color-text-gray-light'>Already have an account, login now!</p>
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
          <Button
            isLoading={loginAccountMutation.isLoading}
            disabled={loginAccountMutation.isLoading}
            type='submit'
            className='w-full rounded-lg bg-color-primary px-5 py-2.5 text-center text-sm text-color-text-light transition-all hover:bg-color-primary-active focus:bg-color-primary-active'
          >
            Login
          </Button>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Don’t have an account yet?{' '}
            <Link to={path.register}>
              <span className='text-color-primary transition-all hover:underline'>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
