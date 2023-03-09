import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Form/Input'
import InputNumber from 'src/components/Form/InputNumber'
import { AppContext } from 'src/context/app.context'
import { setUserProfileToLocalStorage } from 'src/utils/auth'
import { userSchema, UserSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const { setUserProfile, userProfile } = useContext(AppContext)

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
    const res = await updateProfileMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
    refetch()
    setUserProfile(res.data.data)
    setUserProfileToLocalStorage(res.data.data)
    toast(res.data.message)
  })

  return (
    <div>
      <h1 className='text-28 font-semibold'>My Profile</h1>
      <form className='mt-10 flex flex-col gap-10 sm:flex-row' onSubmit={onSubmit}>
        <div className=''>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='h-40 w-40 overflow-hidden rounded-full border'>
              <img
                src={userProfile?.avatar || '/images/avatar-the-boss-baby.png'}
                alt='Avatar'
                title='Avatar'
                className='h-40 w-40 object-cover'
              />
            </div>
            <div className='flex flex-col'>
              <input type='file' className='hidden' accept='.jpg, .jpeg, .png' />
              <button
                type='button'
                className='rounded border px-5 py-2 transition-all hover:border-color-primary hover:text-color-primary'
              >
                Chose image
              </button>
              <span className='mt-4 text-center'>
                Accept file types: <br className='hidden sm:block' />
                .jpg, .jpeg, .png
              </span>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <div className='space-y-6'>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>Email:</div>
              <div className='col-span-8'>{profile?.email}</div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>Name:</span>
              </div>
              <div className='col-span-8'>
                <Input register={register} name='name' placeholder='Your name' errorMessage={errors.name?.message} />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>Phone Number:</span>
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
                <span className='leading-10'>Address:</span>
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
                <span className='leading-10'>Birthday:</span>
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
              Save change
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
