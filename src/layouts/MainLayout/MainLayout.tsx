import React from 'react'
import Footer from './Footer'
import Header from './Header'

interface MainLayoutProps {
  children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col bg-white dark:bg-color-bg-dark-primary'>
      <Header />
      <main className='container mx-auto min-h-screen py-12'>{children}</main>
      <Footer />
    </div>
  )
}
