import { faEarthAsia, faGlobe, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'
import Popover from '../Popover'

export default function SelectLanguage() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <Popover
      className='button__hover--primary text-color-text-light'
      popover={
        <div className='flex flex-col items-start border border-color-border-primary-light bg-color-bg-dark-primary text-color-text-light shadow-sm shadow-color-border-primary-light'>
          <button
            onClick={() => changeLanguage('en')}
            className='button__hover--primary cursor-pointer border-b border-color-black py-2 px-5'
          >
            <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} className='mr-2' />
            English
          </button>
          <button onClick={() => changeLanguage('vi')} className='button__hover--primary cursor-pointer py-2 px-5'>
            <FontAwesomeIcon icon={faEarthAsia} size={'lg'} color={'#feffff'} className='mr-2' />
            Vietnamese
          </button>
        </div>
      }
    >
      <FontAwesomeIcon icon={faGlobe} size={'lg'} color={'#feffff'} />
      <span className='mx-2'>{currentLanguage}</span>
      <FontAwesomeIcon icon={faSortDown} size={'lg'} color={'#feffff'} className='-translate-y-1' />
    </Popover>
  )
}
