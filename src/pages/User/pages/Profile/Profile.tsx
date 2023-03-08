import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Form/Input'
import InputNumber from 'src/components/Form/InputNumber'
import { userSchema, UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
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
      date_of_birth: new Date(2000, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, error } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date())
    }
  }, [profile, setValue])

  console.log(profile)

  return (
    <div>
      <h1 className='text-28 font-semibold'>My Profile</h1>
      <form className='mt-10 flex flex-col gap-10 sm:flex-row'>
        <div className=''>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='h-40 w-40 overflow-hidden rounded-full border'>
              <img
                src='/images/avatar-the-boss-baby.png'
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
                        classNameError='mt-0'
                        placeholder='Phone number'
                        errorMessage={errors.phone?.message}
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
                <div className='grid grid-cols-12 gap-2 sm:gap-4'>
                  <select
                    className='focus:border-color  col-span-4 block w-full rounded-lg 
                  border border-gray-300 bg-gray-50 p-2.5 
                  text-color-text-dark ring-color-primary focus:border-color-primary 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary  sm:text-sm'
                  >
                    <option value=''>Date</option>
                  </select>
                  <select
                    className='focus:border-color  col-span-4 block w-full rounded-lg 
                  border border-gray-300 bg-gray-50 p-2.5 
                  text-color-text-dark ring-color-primary focus:border-color-primary 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary  sm:text-sm'
                  >
                    <option value=''>Month</option>
                  </select>
                  <select
                    className='focus:border-color  col-span-4 block w-full rounded-lg 
                  border border-gray-300 bg-gray-50 p-2.5 
                  text-color-text-dark ring-color-primary focus:border-color-primary 
                  dark:border-gray-600 dark:bg-gray-700 dark:text-color-text-light dark:placeholder-gray-300 dark:focus:border-color-primary dark:focus:ring-color-primary  sm:text-sm'
                  >
                    <option value=''>Year</option>
                  </select>
                </div>
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
