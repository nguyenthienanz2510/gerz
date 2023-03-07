import {
  faCartShopping,
  faPhone,
  faRightFromBracket,
  faRightToBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import purchaseApi from 'src/apis/purchase.api'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import Popover from 'src/components/Popover'
import SelectLanguage from 'src/components/SelectLanguage'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import path from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchasse'
import { AppContext } from 'src/context/app.context'
import { formatCurrency, generateProductSlug } from 'src/utils/utils'
import Navbar from './Navbar'
import SearchProduct from './SearchProduct'

const MAX_PRODUCT_PURCHASE_IN_CART = 5

export default function MainHeader() {
  const queryClient = useQueryClient()
  const [isFixedHeader, setIsFixedHeader] = useState(false)
  const { isAuthenticated, setIsAuthenticated, userProfile, setUserProfile, extendedPurchases } = useContext(AppContext)
  const HEADER_HEIGHT = 180

  useEffect(() => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }, [])
  window.onscroll = () => {
    window.scrollY > HEADER_HEIGHT ? setIsFixedHeader(true) : setIsFixedHeader(false)
  }

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logoutAccount(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUserProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const totalPurchasesInCart = useMemo(() => {
    if (!purchasesInCart) return null
    return purchasesInCart.reduce((result, current) => result + current.product.price * current.buy_count, 0)
  }, [purchasesInCart])

  const handleLogoutAccount = () => {
    logoutMutation.mutate()
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
                  <span>support@gerz.com</span>
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
                    {purchasesInCart?.length ? (
                      <>
                        {purchasesInCart.slice(0, MAX_PRODUCT_PURCHASE_IN_CART).map((productPurchase) => (
                          <Link
                            to={`${path.home}${generateProductSlug({
                              name: productPurchase.product.name,
                              id: productPurchase.product._id
                            })}`}
                            key={productPurchase._id}
                            className='flex gap-3 px-3 py-2'
                          >
                            <div className='h-10 w-10 flex-shrink-0'>
                              <img src={productPurchase.product.image} alt={productPurchase.product.name} />
                            </div>
                            <div className='flex flex-grow items-center'>
                              <span className='text-12 line-clamp-2'>{productPurchase.product.name}</span>
                            </div>
                            <div className='flex-shrink-0 pt-[1px]'>
                              <span className='text-color-secondary'>
                                <strong>{formatCurrency(productPurchase.product.price)} VND</strong>
                              </span>
                            </div>
                          </Link>
                        ))}
                        {purchasesInCart?.length > MAX_PRODUCT_PURCHASE_IN_CART && (
                          <div className='py-2 text-center'>
                            <span className='mr-1'>
                              {purchasesInCart?.length > MAX_PRODUCT_PURCHASE_IN_CART &&
                                purchasesInCart?.length - MAX_PRODUCT_PURCHASE_IN_CART}{' '}
                              more left.
                            </span>
                            <Link to={'/cart'} className='text-color-primary hover:underline'>
                              View all
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className='py-5 text-center text-color-text-light'>
                        No Products in Cart!{' '}
                        <Link className='text-color-primary' to={path.home}>
                          Go to shop now!
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              }
            >
              <Link to={path.cart} className='flex flex-col items-center'>
                <button className='h-10 w-10'>
                  <FontAwesomeIcon icon={faCartShopping} size={'xl'} color={'#feffff'} />
                </button>
                <div className='flex flex-col items-center'>
                  <span>Your cart:</span>
                  <span className='text-color-text-gray-light'>
                    {purchasesInCart?.length} items - {formatCurrency(totalPurchasesInCart || 0)} VND
                  </span>
                </div>
              </Link>
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
                      <SelectLanguage />
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
              <Link to={path.profile} className='flex flex-col items-center'>
                <button className='h-10 w-10'>
                  <FontAwesomeIcon icon={faUser} size={'xl'} color={'#feffff'} />
                </button>
                <div className='flex flex-col items-center'>
                  <span>Profile</span>
                  <span className='text-color-text-gray-light'>{userProfile?.email || 'Username'}</span>
                </div>
              </Link>
            </Popover>
          </div>
        ) : (
          <div className='flex items-center text-color-text-light'>
            <div className='ml-5 flex'>
              <SwitchThemeButton />
              <div className='mx-6 flex items-center text-color-text-dark'>
                <SelectLanguage />
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
        <div className='container mx-auto flex h-16 items-center justify-between'>
          <Navbar />
          <SearchProduct />
        </div>
      </div>
      <div
        className={`fixed ${
          isFixedHeader ? 'top-0' : 'top-[-64px]'
        } left-0 right-0 z-50 border-t-2 border-t-color-bg-dark-secondary bg-[rgba(29,30,35,0.92)] backdrop-blur-md duration-500`}
      >
        <div className='container mx-auto flex h-16 items-center justify-between'>
          <Navbar />
          <SearchProduct />
        </div>
      </div>
    </header>
  )
}
