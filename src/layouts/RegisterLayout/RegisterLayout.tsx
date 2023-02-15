import React from 'react'
import HeaderRegister from '../../components/Layout/HeaderRegister'
import Lottie from 'react-lottie'
import sell_and_buy_json from 'src/assets/lotties/sell-and-buy.json'
import MainFooter from 'src/components/Layout/MainFooter'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-white dark:bg-color-bg-dark-secondary'>
      <HeaderRegister />
      <main className='container mx-auto flex flex-1 items-center py-20'>
        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2'>
          <div className='hidden sm:col-span-1 sm:block'>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: sell_and_buy_json,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice'
                }
              }}
              speed={0.5}
            />
          </div>
          <div className='sm:col-span-1'>{children}</div>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
