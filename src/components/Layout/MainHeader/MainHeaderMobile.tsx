import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import NavbarMobile from './NavbarMobile'
import { useState } from 'react'

export default function MainHeaderMobile() {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false)

  const handleOpenNavBar = () => {
    setIsOpenNavBar(!isOpenNavBar)
  }

  return (
    <header
      className={`top-0 left-0 right-0 bg-color-bg-dark-primary sm:hidden ${isOpenNavBar ? 'fixed' : 'relative'}`}
    >
      <div className='container mx-auto flex h-24 items-center justify-between'>
        <button className='button__hover--primary h-10 w-10' onClick={handleOpenNavBar}>
          <FontAwesomeIcon icon={faBars} size={'xl'} color={'#feffff'} />
        </button>
        <div>
          <Link to={'/'}>
            <img src={logo_main} className='h-20' alt='logo' />
          </Link>
        </div>
        <button className='button__hover--primary h-10 w-10'>
          <FontAwesomeIcon icon={faCartShopping} size={'xl'} color={'#feffff'} />
        </button>
      </div>
      <div
        className={`absolute top-24 h-[calc(100vh_-_96px)] overflow-y-scroll bg-color-bg-dark-secondary transition-all ${
          isOpenNavBar ? 'left-0 right-0' : '-left-full right-full'
        }`}
      >
        <div className='flex items-center border-b-2 border-color-black py-4 text-color-text-light'>
          <div className='container mx-auto flex justify-between'>
            <div className='flex items-center'>
              <Link to={'/login'}>Login/</Link>
              <Link to={'/register'} className='ml-1'>
                Register
              </Link>
            </div>
            <SwitchThemeButton />
          </div>
        </div>
        <NavbarMobile />
      </div>
    </header>
  )
}
