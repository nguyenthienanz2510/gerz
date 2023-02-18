import { faEarthAsia, faGlobe, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import logo_main from 'src/assets/images/logos/logo-main.svg'
import Popover from 'src/components/Popover'
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
            <Popover
              className='button__hover--primary text-color-text-light'
              popover={
                <div className='flex flex-col border border-color-border-primary bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary'>
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
      </div>
    </header>
  )
}
