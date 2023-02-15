import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import Navbar from './Navbar'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import { useEffect, useState } from 'react'

export default function MainHeader() {
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const HEADER_HEIGHT = 180

  useEffect(() => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }, [])

  window.onscroll = () => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }
  return (
    <header className='bg-color-bg-dark-primary'>
      <div className='container mx-auto flex h-32 items-center justify-between'>
        <div>
          <Link to={'/'}>
            <img src={logo_main} className='h-20' alt='logo' />
          </Link>
        </div>
        <div className='flex items-center text-color-text-light'>
          <div className='ml-5 flex'>
            <SwitchThemeButton />
            <div className='ml-3 flex items-center'>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>/Register</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t-2 border-t-color-bg-dark-secondary'>
        <div className='container mx-auto flex h-16 items-center'>
          <Navbar />
        </div>
      </div>
      <div
        className={`fixed ${
          isFixedHeader ? 'top-0' : 'top-[-64px]'
        } left-0 right-0 border-t-2 border-t-color-bg-dark-secondary bg-color-bg-dark-primary duration-500 `}
      >
        <div className='container mx-auto flex h-16 items-center'>
          <Navbar />
        </div>
      </div>
    </header>
  )
}
