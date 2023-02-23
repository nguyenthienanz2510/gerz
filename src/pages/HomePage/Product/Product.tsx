import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faNoStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function Product() {
  return (
    <Link to={'/'}>
      <div className='product__cart rounded border border-color-border-primary-dark bg-color-white transition-all hover:border-color-primary dark:border-color-border-primary-light dark:bg-color-bg-dark-primary dark:hover:border-color-primary'>
        <div className='relative w-full overflow-hidden pt-[100%]'>
          <img
            src='https://printful-upload.s3-accelerate.amazonaws.com/tmp/e060b2db363d976ca02eda8fc559352d/white-glossy-mug-white-11oz-handle-on-left-63f327694e125.png'
            alt='thumb'
            className='absolute top-0 left-0 h-full w-full'
          />
        </div>
        <div className='flex flex-col items-center gap-2 px-3 pt-2 pb-4'>
          <div className='min-h-[40px]'>
            <span className='text-center line-clamp-2'>Beretta JMN9S15CTC BU9 Nano 6+1 9mm 3.07″</span>
          </div>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
            <div className='relative'>
              <div className='absolute top-0 left-0 h-full w-[50%] overflow-hidden'>
                <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
              </div>
              <FontAwesomeIcon icon={faNoStar} size={'1x'} color={'#FFCC00'} />
            </div>
          </div>
          <div>
            <span className='text-22 font-bold text-color-secondary'>$125</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
