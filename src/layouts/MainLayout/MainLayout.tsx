import React from 'react'
import MainHeaderMobile from 'src/components/Layout/MainHeader/MainHeaderMobile'
import MainFooter from '../../components/Layout/MainFooter'
import MainHeader from '../../components/Layout/MainHeader'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-color-bg-dark-secondary'>
      <MainHeader />
      <MainHeaderMobile />
      <main className='container mx-auto flex-1 pt-12 pb-20'>{children}</main>
      <MainFooter />
    </div>
  )
}
