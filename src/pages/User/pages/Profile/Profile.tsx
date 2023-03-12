import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Form/Input'
import InputFile from 'src/components/Form/InputFile'
import InputNumber from 'src/components/Form/InputNumber'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { setUserProfileToLocalStorage } from 'src/utils/auth'
import { userSchema, UserSchema } from 'src/utils/rules'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import DateSelect from '../../components/DateSelect'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { t } = useTranslation(['profile'])
  const { setUserProfile, userProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1970, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    data: profileData,
    error,
    refetch
  } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data
  console.log(profile)

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = ''
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      setUserProfile(res.data.data)
      setUserProfileToLocalStorage(res.data.data)
      toast(res.data.message)
    } catch (err) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div>
      <h1 className='text-28 font-semibold'>{t('profile:myProfile')}</h1>
      <form className='mt-10 flex flex-col gap-10 sm:flex-row' onSubmit={onSubmit}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='h-40 w-40 overflow-hidden rounded-full border'>
            <img
              src={previewImage || getAvatarURL(userProfile?.avatar)}
              alt='Avatar'
              title='Avatar'
              className='h-40 w-40 object-cover'
            />
          </div>
          <InputFile onchange={handleChangeFile} />
          <div className='flex flex-col'>
            <span className='mt-4 text-center'>Max file size: 1MB</span>
            <span className='mt-2 text-center'>
              {t('profile:acceptFileTypes')}: <br className='hidden sm:block' />
              .jpg, .jpeg, .png
            </span>
          </div>
        </div>
        <div className='flex-1'>
          <div className='space-y-6'>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>{t('profile:email')}:</div>
              <div className='col-span-8'>{profile?.email}</div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>{t('profile:name')}:</span>
              </div>
              <div className='col-span-8'>
                <Input register={register} name='name' placeholder='Your name' errorMessage={errors.name?.message} />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>{t('profile:phoneNumber')}:</span>
              </div>
              <div className='col-span-8'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => {
                    return (
                      <InputNumber
                        placeholder='Phone number'
                        errorMessage={errors.phone?.message}
                        showError
                        {...field}
                        onchange={(event) => {
                          field.onChange(event)
                        }}
                      />
                    )
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>{t('profile:address')}:</span>
              </div>
              <div className='col-span-8'>
                <Input
                  register={register}
                  name='address'
                  placeholder='Address'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>{t('profile:birthday')}:</span>
              </div>
              <div className='col-span-8'>
                <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                    <DateSelect
                      errorMessage={errors.date_of_birth?.message}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
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
        </div>
      </form>
    </div>
  )
}
