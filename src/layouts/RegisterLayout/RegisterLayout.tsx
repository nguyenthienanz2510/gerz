import React from 'react'
import HeaderRegister from '../../components/Layout/HeaderRegister'
import Lottie from 'react-lottie'
import sell_and_buy_json from 'src/assets/lotties/sell-and-buy.json'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div>
      <HeaderRegister />
      <main className='container mx-auto'>
        <div className='mx-auto mt-32 grid max-w-4xl grid-cols-2 gap-10'>
          <div className='col-span-1 hidden sm:block'>
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
          <div className='col-span-2 sm:col-span-1'>{children}</div>
        </div>
      </main>
    </div>
  )
}
