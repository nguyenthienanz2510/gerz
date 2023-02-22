import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faNoStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AsideFilter from './AsideFilter'
import SortProducts from './SortProducts'

export default function HomePage() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
        <div className='md:col-span-3'>
          <AsideFilter />
        </div>
        <div className='md:col-span-9'>
          <SortProducts />
          <div className='mt-7 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 md:gap-y-7 xl:grid-cols-4'>
            {Array(30)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='col-span-1' key={index}>
                    <Link to={'/'}>
                      <div className='product__cart rounded border border-color-border-primary-dark bg-color-white transition-all hover:border-color-primary dark:border-color-border-primary-light dark:bg-color-bg-dark-primary dark:hover:border-color-primary'>
                        <div className='overflow-hidden'>
                          <img
                            src='https://printful-upload.s3-accelerate.amazonaws.com/tmp/e060b2db363d976ca02eda8fc559352d/white-glossy-mug-white-11oz-handle-on-left-63f327694e125.png'
                            alt='thumb'
                          />
                        </div>
                        <div className='flex flex-col items-center gap-2 px-3 pt-2 pb-4'>
                          <span className='text-truncate-2 text-center'>Beretta JMN9S15CTC BU9 Nano 6+1 9mm 3.07″</span>
                          <span>
                            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
                            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
                            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
                            <FontAwesomeIcon icon={faStar} size={'1x'} color={'#FFCC00'} />
                            <FontAwesomeIcon icon={faNoStar} size={'1x'} color={'#FFCC00'} />
                          </span>
                          <span className='text-22 font-bold text-color-secondary'>$125</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
