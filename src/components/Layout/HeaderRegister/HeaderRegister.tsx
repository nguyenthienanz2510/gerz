import { Link } from 'react-router-dom'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import SelectLanguage from 'src/components/SelectLanguage'
import SwitchThemeButton from 'src/components/SwitchThemeButton'

export default function HeaderRegister() {
  return (
    <header className='bg-color-bg-dark-primary'>
      <div className='container mx-auto flex h-24 items-center justify-between'>
        <div>
          <Link to={'/'}>
            <img src={logo_main} className='h-16' alt='logo' />
          </Link>
        </div>
        <div className='flex items-center'>
          <SwitchThemeButton />
          <div className='ml-5 flex items-center text-color-text-dark'>
            <SelectLanguage />
          </div>
        </div>
      </div>
    </header>
  )
}
