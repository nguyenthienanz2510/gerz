import React from 'react'
import MainFooter from '../../components/Layout/MainFooter'
import MainHeader from '../../components/Layout/MainHeader'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-color-bg-dark-secondary'>
      <MainHeader />
      <main className='container mx-auto flex-1 py-12'>{children}</main>
      <MainFooter />
    </div>
  )
}
