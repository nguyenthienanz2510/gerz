import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SortProducts() {
  return (
    <div className='flex flex-col items-start justify-between gap-2 rounded bg-color-white py-3 dark:bg-color-bg-dark-primary dark:px-5 sm:flex-row sm:items-center'>
      <div className='flex flex-wrap items-center gap-2'>
        Sort By:{' '}
        <button className='h-9 rounded bg-color-third px-3 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'>
          Pupular
        </button>
        <button className='h-9 rounded bg-color-third px-3 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'>
          Latest
        </button>
        <button className='h-9 rounded bg-color-third px-3 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'>
          Top sales
        </button>
        <select
          value=''
          className='h-9 rounded bg-color-third px-3 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'
        >
          <option value='' disabled>
            Price
          </option>
          <option value='price:asc'>Price low to hight</option>
          <option value='price:desc'>Price hight to low</option>
        </select>
      </div>
      <div className='flex items-center gap-2'>
        <div>
          <span className='font-semibold text-color-primary'>1</span>/4
        </div>
        <div>
          <button className='h-9 rounded-tl rounded-bl border-r border-color-border-primary-dark bg-color-third px-4 hover:bg-color-primary-active dark:border-color-border-primary-light dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={'1x'}
              className='text-color-text-dark dark:text-color-text-light'
            />
          </button>
          <button className='h-9 rounded-tr rounded-br bg-color-third px-4 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'>
            <FontAwesomeIcon
              icon={faChevronRight}
              size={'1x'}
              className='text-color-text-dark dark:text-color-text-light'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
