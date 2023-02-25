import { faEarthAsia, faGlobe, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popover from '../Popover'

export default function SelectLanguage() {
  return (
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
  )
}
