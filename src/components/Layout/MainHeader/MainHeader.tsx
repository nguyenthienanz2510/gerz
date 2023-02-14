import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import Navbar from './Navbar'
import logo_main from 'src/assets/images/logos/logo-main.svg'

export default function MainHeader() {
  return (
    <header className='border-color-border-dark border-b'>
      <div className='container mx-auto'>
        <div className='flex h-24 items-center justify-between'>
          <div>
            <Link to={'/'}>
              <img src={logo_main} className='h-20' alt='logo' />
            </Link>
          </div>
          <div className='flex items-center'>
            <Navbar />
            <div className='ml-5 flex'>
              <SwitchThemeButton />
              <div className='ml-2 flex items-center'>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>/Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
