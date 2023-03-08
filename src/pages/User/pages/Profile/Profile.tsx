import React from 'react'
import Input from 'src/components/Form/Input'

export default function Profile() {
  return (
    <div>
      <h1 className='text-28 font-semibold'>My Profile</h1>
      <div className='mt-10 flex flex-col gap-10 sm:flex-row'>
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
              <button className='rounded border px-5 py-2 transition-all hover:border-color-primary hover:text-color-primary'>
                Change image
              </button>
              <span className='mt-4 text-center'>
                Accept file types: <br className='hidden sm:block' />
                .jpg, .jpeg, .png
              </span>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <form className='space-y-6'>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>Email:</div>
              <div className='col-span-8'>NguyenThienAn@gmail.com</div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>Name:</span>
              </div>
              <div className='col-span-8'>
                <Input />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>Phone Number:</span>
              </div>
              <div className='col-span-8'>
                <Input />
              </div>
            </div>
            <div className='grid grid-cols-12'>
              <div className='col-span-4'>
                <span className='leading-10'>Address:</span>
              </div>
              <div className='col-span-8'>
                <Input />
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
          </form>
        </div>
      </div>
    </div>
  )
}
