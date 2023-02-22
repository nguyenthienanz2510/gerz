import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Form/Input'
import path from 'src/constant/path'

export default function AsideFilter() {
  return (
    <div className='space-y-5 rounded border border-color-border-primary-dark p-5 dark:border-none dark:bg-color-bg-dark-primary'>
      <div>
        <h4 className='mb-3 border-b border-color-border-primary-dark pb-3 font-semibold dark:border-color-border-primary-light'>
          ALL CATEGORIES
        </h4>
        <ul className='list-disc space-y-1 pl-5'>
          <li>
            <Link to={path.home} className='inline-block py-1'>
              T-Shirt
            </Link>
          </li>
          <li>
            <Link to={path.home} className='inline-block py-1'>
              T-Shirt
            </Link>
          </li>
          <li>
            <Link to={path.home} className='inline-block py-1'>
              T-Shirt
            </Link>
          </li>
          <li>
            <Link to={path.home} className='inline-block py-1'>
              T-Shirt
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className='mb-3 border-b border-color-border-primary-dark pb-3 font-semibold dark:border-color-border-primary-light'>
          FILTERS
        </h4>
        <div>
          <h5 className='mb-3 font-semibold'>Price Range</h5>
          <form>
            <div className='flex items-center gap-2'>
              <Input classNameError='mt-0' type='number' className='grow' placeholder='from' name='from' />
              <div>-</div>
              <Input classNameError='mt-0' type='number' className='grow' placeholder='to' name='to' />
            </div>
            <Button className='mt-3 w-full rounded-lg bg-color-primary px-5 py-2.5 text-center text-sm text-color-text-light transition-all hover:bg-color-primary-active focus:bg-color-primary-active'>
              Apply
            </Button>
          </form>
        </div>
        <div>
          <h5 className='mt-5 mb-2 font-semibold'>Feedback</h5>
          <ul>
            <li>
              <Link to={path.home} className='inline-block py-1'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return <FontAwesomeIcon key={index} icon={faStar} size={'1x'} color={'#FFCC00'} />
                  })}
              </Link>
            </li>
            <li>
              <Link to={path.home} className='inline-block py-1'>
                {Array(4)
                  .fill(0)
                  .map((_, index) => {
                    return <FontAwesomeIcon key={index} icon={faStar} size={'1x'} color={'#FFCC00'} />
                  })}
              </Link>
            </li>
            <li>
              <Link to={path.home} className='inline-block py-1'>
                {Array(3)
                  .fill(0)
                  .map((_, index) => {
                    return <FontAwesomeIcon key={index} icon={faStar} size={'1x'} color={'#FFCC00'} />
                  })}
              </Link>
            </li>
            <li>
              <Link to={path.home} className='inline-block py-1'>
                {Array(2)
                  .fill(0)
                  .map((_, index) => {
                    return <FontAwesomeIcon key={index} icon={faStar} size={'1x'} color={'#FFCC00'} />
                  })}
              </Link>
            </li>
            <li>
              <Link to={path.home} className='inline-block py-1'>
                {Array(1)
                  .fill(0)
                  .map((_, index) => {
                    return <FontAwesomeIcon key={index} icon={faStar} size={'1x'} color={'#FFCC00'} />
                  })}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='border-t border-color-border-primary-dark dark:border-color-border-primary-light'>
        <Button className='mt-5 w-full rounded-lg bg-color-secondary px-5 py-2.5 text-center text-sm text-color-text-light transition-all hover:bg-color-secondary-active focus:bg-color-secondary-active'>
          CLEAR ALL
        </Button>
      </div>
    </div>
  )
}
