import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faNoStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
        <div className='md:col-span-3'>Side Bar</div>
        <div className='md:col-span-9'>
          <div className='rounded bg-color-white py-5 dark:bg-color-bg-dark-primary dark:px-5'>
            Sort By:{' '}
            <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Pupular</span>
            <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Latest</span>
            <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Price</span>
          </div>
          <div className='mt-7 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 md:gap-y-7 xl:grid-cols-4'>
            <div className='col-span-1'>
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
            <div className='col-span-1'>
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
            <div className='col-span-1'>
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
            <div className='col-span-1'>
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
            <div className='col-span-1'>
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
          </div>
        </div>
      </div>
    </>
  )
}
