import { Link } from 'react-router-dom'
import SwitchThemeButton from 'src/components/SwitchThemeButton'
import logo_main from 'src/assets/images/logos/logo-main.svg'

export default function HeaderRegister() {
  return (
    <header className='bg-color-bg-dark-primary'>
      <div className='container mx-auto flex h-32 items-center justify-between'>
        <div>
          <Link to={'/'}>
            <img src={logo_main} className='h-20' alt='logo' />
          </Link>
        </div>
        <div className='flex items-center'>
          <SwitchThemeButton />
          <div className='ml-3 flex items-center text-color-text-dark'>
            <select>
              <option>English</option>
              <option>Vietnamese</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
