import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import Navbar from './Navbar'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import { useEffect, useState } from 'react'
import { faUser, faCartShopping, faPhone, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popover from 'src/components/Popover'

export default function MainHeader() {
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const [isLogin] = useState(true)
  const HEADER_HEIGHT = 180

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

        {isLogin ? (
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
                  <span>support@gerz.com</span>
                </a>
              </div>
            </div>
            <Popover
              className='button__hover--primary flex flex-col items-center'
              popover={
                <div className='flex w-[420px] flex-col rounded border border-color-border-primary bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary'>
                  <div className='flex justify-between border-b border-color-border-primary px-3 py-3'>
                    <span>
                      <strong>New Products Added</strong>
                    </span>
                    <Link to={'/cart'} className='text-color-primary hover:underline'>
                      View cart
                    </Link>
                  </div>
                  <div className='py-2'>
                    <Link to={'/'} className='flex gap-3 px-3 py-2'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                          alt='productImage'
                        />
                      </div>
                      <div className='flex flex-grow items-center'>
                        <span className='text-truncate-2 text-12'>
                          DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                        </span>
                      </div>
                      <div className='flex-shrink-0'>
                        <span className='text-color-secondary'>
                          <strong>125$</strong>
                        </span>
                      </div>
                    </Link>
                    <Link to={'/'} className='flex gap-3 px-3 py-2'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                          alt='productImage'
                        />
                      </div>
                      <div className='flex flex-grow items-center'>
                        <span className='text-truncate-2 text-12'>
                          DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                        </span>
                      </div>
                      <div className='flex-shrink-0'>
                        <span className='text-color-secondary'>
                          <strong>125$</strong>
                        </span>
                      </div>
                    </Link>
                    <Link to={'/'} className='flex gap-3 px-3 py-2'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                          alt='productImage'
                        />
                      </div>
                      <div className='flex flex-grow items-center'>
                        <span className='text-truncate-2 text-12'>
                          DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                        </span>
                      </div>
                      <div className='flex-shrink-0'>
                        <span className='text-color-secondary'>
                          <strong>125$</strong>
                        </span>
                      </div>
                    </Link>
                    <Link to={'/'} className='flex gap-3 px-3 py-2'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                          alt='productImage'
                        />
                      </div>
                      <div className='flex flex-grow items-center'>
                        <span className='text-truncate-2 text-12'>
                          DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                        </span>
                      </div>
                      <div className='flex-shrink-0'>
                        <span className='text-color-secondary'>
                          <strong>125$</strong>
                        </span>
                      </div>
                    </Link>
                    <Link to={'/'} className='flex gap-3 px-3 py-2'>
                      <div className='h-10 w-10 flex-shrink-0'>
                        <img
                          src='https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg'
                          alt='productImage'
                        />
                      </div>
                      <div className='flex flex-grow items-center'>
                        <span className='text-truncate-2 text-12'>
                          DIEN THOAI VSMART ACTIVE 3 6GB/64GB - HANG CHINH HANG
                        </span>
                      </div>
                      <div className='flex-shrink-0'>
                        <span className='text-color-secondary'>
                          <strong>125$</strong>
                        </span>
                      </div>
                    </Link>
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
                <div className='flex flex-col border border-color-border-primary bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary'>
                  <div className='flex flex-col'>
                    <span className='border-b border-color-black py-4 px-5'>
                      Hello! <span className='text-color-primary'>Joshua Kimmich</span>
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='button__hover--primary cursor-pointer border-b border-color-black py-2 px-5'>
                      Profile
                    </span>
                    <span className='button__hover--primary flex cursor-pointer justify-between border-b border-color-black py-2 px-5'>
                      <span>Change theme</span>
                      <SwitchThemeButton size={20} />
                    </span>
                    <span className='button__hover--primary flex cursor-pointer justify-between py-2 px-5'>
                      Logout <FontAwesomeIcon icon={faRightFromBracket} size={'lg'} color={'#feffff'} />
                    </span>
                  </div>
                </div>
              }
            >
              <button className='h-10 w-10'>
                <FontAwesomeIcon icon={faUser} size={'xl'} color={'#feffff'} />
              </button>
              <div className='flex flex-col items-center'>
                <span>Profile</span>
                <span className='text-color-text-gray-light'>Joshua Kimmich</span>
              </div>
            </Popover>
          </div>
        ) : (
          <div className='flex items-center text-color-text-light'>
            <div className='ml-5 flex'>
              <SwitchThemeButton />
              <div className='ml-3 flex items-center'>
                <Link to={'/login'}>Login/</Link>
                <Link to={'/register'} className='ml-1'>
                  Register
                </Link>
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
        } left-0 right-0 border-t-2 border-t-color-bg-dark-secondary bg-[rgba(29,30,35,0.92)] backdrop-blur-md duration-500`}
      >
        <div className='container mx-auto flex h-16 items-center'>
          <Navbar />
        </div>
      </div>
    </header>
  )
}
