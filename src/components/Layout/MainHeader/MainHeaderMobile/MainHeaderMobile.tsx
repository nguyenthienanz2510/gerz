import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import NavbarMobile from './NavbarMobile'
import { useContext, useState } from 'react'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import Popover from 'src/components/Popover'
import { faEarthAsia, faGlobe, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'

export default function MainHeaderMobile() {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false)
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile } = useContext(AppContext)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUserProfile(null)
    }
  })

  const handleOpenNavBar = () => {
    setIsOpenNavBar(!isOpenNavBar)
  }

  const handleLogoutAccount = () => {
    logoutMutation.mutate()
  }

  return (
    <header
      className={`top-0 left-0 right-0 z-50 bg-color-bg-dark-primary sm:hidden ${isOpenNavBar ? 'fixed' : 'relative'}`}
    >
      <div className='container mx-auto flex h-20 items-center justify-between'>
        <button className='button__hover--primary h-10 w-10' onClick={handleOpenNavBar}>
          <FontAwesomeIcon icon={faBars} size={'xl'} color={'#feffff'} />
        </button>
        <div>
          <Link to={path.home}>
            <img src={logo_main} className='h-16' alt='logo' />
          </Link>
        </div>
        <Link
          to={isAuthenticated ? path.cart : path.login}
          className='button__hover--primary flex h-10 w-10 items-center justify-center'
        >
          <FontAwesomeIcon icon={faCartShopping} size={'xl'} color={'#feffff'} />
        </Link>
      </div>
      <div
        className={`absolute top-20 h-[calc(100vh_-_80px)] overflow-y-scroll bg-color-bg-dark-secondary transition-all ${
          isOpenNavBar ? 'left-0 right-0' : '-left-full right-full'
        }`}
      >
        {isAuthenticated ? (
          <div>
            <div className='flex items-center border-b-2 border-color-black py-4 text-color-text-light'>
              <div className='container mx-auto flex items-center justify-between'>
                <span>USER</span>
                <FontAwesomeIcon icon={faSortDown} size={'lg'} color={'#feffff'} className='-translate-y-1' />
              </div>
            </div>
            <div className='flex flex-col border-b-2 border-color-black text-color-text-light'>
              <div className='border-b border-color-black py-3 px-3'>
                <div className='container'>
                  <span>
                    Hello! <span className='text-color-primary'>{userProfile?.email || 'Username'}</span>
                  </span>
                </div>
              </div>
              <Link
                to={path.profile}
                className='button__hover--primary cursor-pointer border-b border-color-black py-3 px-3'
              >
                <div className='container'>Profile</div>
              </Link>
              <div className='border-b border-color-black py-3 px-3'>
                <div className='container flex justify-between '>
                  <span>Language</span>
                  <Popover
                    className='button__hover--primary text-color-text-light'
                    popover={
                      <div className='flex flex-col border border-color-border-primary-light bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary-light'>
                        <span className='button__hover--primary cursor-pointer border-b border-color-black py-2 px-5'>
                          <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} className='mr-2' />
                          English
                        </span>
                        <span className='button__hover--primary cursor-pointer py-2 px-5'>
                          <FontAwesomeIcon icon={faEarthAsia} size={'lg'} color={'#feffff'} className='mr-2' />
                          Vietnamese
                        </span>
                      </div>
                    }
                  >
                    <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} />
                    <span className='mx-2'>English</span>
                    <FontAwesomeIcon icon={faSortDown} size={'lg'} color={'#feffff'} className='-translate-y-1' />
                  </Popover>
                </div>
              </div>
              <div className='border-b border-color-black py-3 px-3'>
                <div className='container flex justify-between'>
                  <span className='cursor-default'>Change theme</span>
                  <span className='button__hover--primary ml-5 cursor-pointer'>
                    <SwitchThemeButton />
                  </span>
                </div>
              </div>
              <button onClick={handleLogoutAccount} className='button__hover--primary cursor-pointer py-3 px-3'>
                <div className='container flex justify-between'>
                  Logout <FontAwesomeIcon icon={faRightFromBracket} size={'lg'} color={'#feffff'} className='ml-5' />
                </div>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className='flex items-center border-b-2 border-color-black py-4 text-color-text-light'>
              <div className='container mx-auto flex justify-between'>
                <div className='flex items-center'>
                  <Link to={path.login}>Login/</Link>
                  <Link to={path.register} className='ml-1'>
                    Register
                  </Link>
                </div>
                <SwitchThemeButton size={24} />
              </div>
            </div>
            <div className='flex items-center border-b-2 border-color-black py-4 text-color-text-light'>
              <div className='container mx-auto flex justify-between'>
                <span>Language</span>
                <Popover
                  className='button__hover--primary text-color-text-light'
                  popover={
                    <div className='flex flex-col border border-color-border-primary-light bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary-light'>
                      <span className='button__hover--primary cursor-pointer border-b border-color-black py-2 px-5'>
                        <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} className='mr-2' />
                        English
                      </span>
                      <span className='button__hover--primary cursor-pointer py-2 px-5'>
                        <FontAwesomeIcon icon={faEarthAsia} size={'lg'} color={'#feffff'} className='mr-2' />
                        Vietnamese
                      </span>
                    </div>
                  }
                >
                  <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} />
                  <span className='mx-2'>English</span>
                  <FontAwesomeIcon icon={faSortDown} size={'lg'} color={'#feffff'} className='-translate-y-1' />
                </Popover>
              </div>
            </div>
          </>
        )}

        <NavbarMobile />
      </div>
    </header>
  )
}
