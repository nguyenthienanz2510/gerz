import React from 'react'
import MainFooter from '../../components/Layout/MainFooter'
import MainHeader from '../../components/Layout/MainHeader'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col bg-white dark:bg-color-bg-dark-primary'>
      <MainHeader />
      <main className='container mx-auto min-h-screen py-12'>{children}</main>
      <MainFooter />
    </div>
  )
}
