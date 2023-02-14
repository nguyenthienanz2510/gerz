import React from 'react'
import Header from './Header'
import Lottie from 'react-lottie'
import sell_and_buy_json from 'src/assets/lotties/sell-and-buy.json'

interface RegisterLayoutProps {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return (
    <div>
      <Header />
      <main className='container mx-auto'>
        <div className='mx-auto mt-32 grid max-w-3xl grid-cols-2 gap-5'>
          <div className='col-span-1 hidden sm:block'>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: sell_and_buy_json
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
