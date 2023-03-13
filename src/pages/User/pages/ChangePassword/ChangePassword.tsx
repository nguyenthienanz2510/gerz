import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Form/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_new_password'>

const ChangePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_new_password'])

export default function ChangePassword() {
  const { t } = useTranslation(['profile'])
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver(ChangePasswordSchema)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      const res = await updateProfileMutation.mutateAsync({
        password: data.password as string,
        new_password: data.new_password as string
      })
      toast(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div>
      <h1 className='text-28 font-semibold'>Change Password</h1>
      <form className='mt-10 flex flex-col gap-10 sm:flex-row' onSubmit={onSubmit}>
        <div className='space-y-6'>
          <div className='grid grid-cols-3'>
            <div className='col-span-1 mr-5'>
              <span className='leading-10'>Current password:</span>
            </div>
            <div className='col-span-2'>
              <Input
                register={register}
                name='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
                type='password'
              />
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <div className='col-span-1 mr-5'>
              <span className='leading-10'>New password:</span>
            </div>
            <div className='col-span-2'>
              <Input
                register={register}
                name='new_password'
                placeholder='New password'
                errorMessage={errors.new_password?.message}
                type='password'
              />
            </div>
          </div>
          <div className='grid grid-cols-3'>
            <div className='col-span-1 mr-5'>
              <span className='leading-10'>Retype new password:</span>
            </div>
            <div className='col-span-2'>
              <Input
                register={register}
                name='confirm_new_password'
                placeholder='Confirm new password'
                errorMessage={errors.confirm_new_password?.message}
                type='password'
              />
            </div>
          </div>

          <button
            type='submit'
            className='rounded border border-color-primary px-5 py-2.5 text-color-primary hover:border-color-primary-active hover:bg-color-primary-active hover:text-color-text-light'
          >
            {t('profile:saveChange')}
          </button>
        </div>
      </form>
    </div>
  )
}
