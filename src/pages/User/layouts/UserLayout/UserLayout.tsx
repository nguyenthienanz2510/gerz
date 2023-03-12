import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='grid grid-cols-1 gap-10 md:grid-cols-4'>
      <div className='md:col-span-1 md:border-r'>
        <UserSideNav />
      </div>
      <div className='md:col-span-3'>
        <Outlet />
      </div>
    </div>
  )
}
