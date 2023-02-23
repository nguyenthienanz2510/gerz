import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import Navbar from './Navbar'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import { useContext, useEffect, useState } from 'react'
import {
  faUser,
  faCartShopping,
  faPhone,
  faRightFromBracket,
  faRightToBracket
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popover from 'src/components/Popover'
import { AppContext } from 'src/context/app.context'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from 'src/apis/auth.api'
import { faEarthAsia, faGlobe, faSortDown } from '@fortawesome/free-solid-svg-icons'
import path from 'src/constant/path'

export default function MainHeader() {
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile } = useContext(AppContext)
  const HEADER_HEIGHT = 180

  const logoutMutation = useMutation({
    mutationFn: () => logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUserProfile(null)
    }
  })

  const handleLogoutAccount = () => {
    logoutMutation.mutate()
  }

  useEffect(() => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }, [])
  window.onscroll = () => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }
  return (
    <header className='hidden bg-color-bg-dark-primary sm:block'>
      <div className='container mx-auto flex h-32 items-center justify-between'>
        <div>
          <Link to={'/'}>
            <img src={logo_main} className='h-20' alt='logo' />
          </Link>
        </div>

        {isAuthenticated ? (
          <div className='flex items-center gap-10 text-12 text-color-text-light'>
            <div className='flex flex-col items-center'>
              <a href='tel:0363016630'>
                <div className='button__hover--primary flex h-10 w-10 items-center justify-center'>
                  <FontAwesomeIcon icon={faPhone} size={'xl'} color={'#feffff'} />
                </div>
              </a>
              <div className='flex flex-col items-center'>
                <a href='tel:0363016630'>0363-016-630</a>
                <a href='mailto:support@gerz.com' className='text-color-text-gray-light'>
                  <span>anzgermany@gmail.com</span>
                </a>
              </div>
            </div>
            <Popover
              className='button__hover--primary flex flex-col items-center'
              popover={
                <div className='flex w-[420px] flex-col rounded border border-color-border-primary-light bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary-light'>
                  <div className='flex justify-between border-b border-color-border-primary-light px-3 py-3'>
                    <span>
                      <strong>New Products Added</strong>
                    </span>
                    <Link to={'/cart'} className='text-color-primary hover:underline'>
                      View cart
                    </Link>
                  </div>
                  <div className='py-2'>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <Link to={'/'} key={index} className='flex gap-3 px-3 py-2'>
                          <div className='h-10 w-10 flex-shrink-0'>
                            <img
                              src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                              alt='productImage'
                            />
                          </div>
                          <div className='flex flex-grow items-center'>
                            <span className='line-clamp-2 text-12'>
                              DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                            </span>
                          </div>
                          <div className='flex-shrink-0 pt-[1px]'>
                            <span className='text-color-secondary'>
                              <strong>125$</strong>
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              }
            >
              <button className='h-10 w-10'>
                <FontAwesomeIcon icon={faCartShopping} size={'xl'} color={'#feffff'} />
              </button>
              <div className='flex flex-col items-center'>
                <span>Your cart:</span>
                <span className='text-color-text-gray-light'>0 items - $ 0.00</span>
              </div>
            </Popover>
            <Popover
              className='button__hover--primary flex flex-col items-center'
              popover={
                <div className='flex flex-col border border-color-border-primary-light bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary-light'>
                  <div className='flex flex-col'>
                    <span className='border-b border-color-black py-4 px-5'>
                      Hello! <span className='text-color-primary'>{userProfile?.email || 'Username'}</span>
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <Link
                      to={path.profile}
                      className='button__hover--primary cursor-pointer border-b border-color-black py-2 px-5'
                    >
                      Profile
                    </Link>
                    <span className='flex justify-between border-b border-color-black py-2 px-5'>
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
                    </span>
                    <span className='flex justify-between border-b border-color-black py-2 px-5'>
                      <span className='cursor-default'>Change theme</span>
                      <span className='button__hover--primary ml-5 cursor-pointer'>
                        <SwitchThemeButton />
                      </span>
                    </span>
                    <button
                      onClick={handleLogoutAccount}
                      className='button__hover--primary flex cursor-pointer justify-between py-2 px-5'
                    >
                      Logout{' '}
                      <FontAwesomeIcon icon={faRightFromBracket} size={'lg'} color={'#feffff'} className='ml-5' />
                    </button>
                  </div>
                </div>
              }
            >
              <button className='h-10 w-10'>
                <FontAwesomeIcon icon={faUser} size={'xl'} color={'#feffff'} />
              </button>
              <div className='flex flex-col items-center'>
                <span>Profile</span>
                <span className='text-color-text-gray-light'>{userProfile?.email || 'Username'}</span>
              </div>
            </Popover>
          </div>
        ) : (
          <div className='flex items-center text-color-text-light'>
            <div className='ml-5 flex'>
              <SwitchThemeButton />
              <div className='mx-6 flex items-center text-color-text-dark'>
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
              <div className='flex items-center gap-2'>
                <Link to={path.login} className='button__hover--primary'>
                  <FontAwesomeIcon icon={faRightToBracket} size={'lg'} color={'#feffff'} />
                  <span className='ml-2'>Login</span>
                </Link>
                <span className='h-4 border-r border-gray-400'></span>
                <Link to={path.register}>Register</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='border-t-2 border-t-color-bg-dark-secondary'>
        <div className='container mx-auto flex h-16 items-center'>
          <Navbar />
        </div>
      </div>
      <div
        className={`fixed ${
          isFixedHeader ? 'top-0' : 'top-[-64px]'
        } left-0 right-0 z-50 border-t-2 border-t-color-bg-dark-secondary bg-[rgba(29,30,35,0.92)] backdrop-blur-md duration-500`}
      >
        <div className='container mx-auto flex h-16 items-center'>
          <Navbar />
        </div>
      </div>
    </header>
  )
}
