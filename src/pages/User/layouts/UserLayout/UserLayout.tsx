import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
      <div className='md:col-span-3'>
        <UserSideNav />
      </div>
      <div className='md:col-span-9'>
        <Outlet />
      </div>
    </div>
  )
}
