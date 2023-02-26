import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import path from 'src/constant/path'
import { QueryConfig } from 'src/pages/HomePage/HomePage'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: PaginationProps) {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotAfter = (pageNumber: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={pageNumber} className='flex h-8 w-8 items-center justify-center'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotBefore = (pageNumber: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={pageNumber} className='flex h-8 w-8 items-center justify-center'>
            ...
          </span>
        )
      }
      return null
    }

    /**
      with pageSize = 20, RANGE = 2
      
      case page = 4
      page < 5 && pageNumber > 6 && pageNumber < 17

      case page = 10
      page > 5 && pageNumber > 2
        - before: pageNumber < 8 && pageNumber > 2
        - after: pageNumber > 12 && pageNumber < 19

      case page = 18
      page > 16 && pageNumber > 2 && pageNumber < 16
     */

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = Number(index + 1)
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(pageNumber)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(pageNumber)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(pageNumber)
          }
        } else if (page > pageSize - RANGE * 2 - 1 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(pageNumber)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString()
            }}
            key={pageNumber}
            className={classNames(
              'flex h-8 w-8 items-center justify-center rounded border hover:border-color-primary',
              {
                'border-color-primary': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-10 flex flex-wrap justify-center gap-2'>
      {page === 1 ? (
        <span className='flex h-8 w-8 cursor-not-allowed items-center justify-center'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size={'1x'}
            className='text-color-text-gray-dark dark:text-color-text-gray-light'
          />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
          }}
          className='flex h-8 w-8 items-center justify-center rounded border border-transparent hover:border-color-primary'
        >
          <FontAwesomeIcon icon={faChevronLeft} size={'1x'} />
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='flex h-8 w-8 cursor-not-allowed items-center justify-center'>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={'1x'}
            className='text-color-text-gray-dark dark:text-color-text-gray-light'
          />
        </span>
      ) : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
          }}
          className='flex h-8 w-8 items-center justify-center rounded border border-transparent hover:border-color-primary'
        >
          <FontAwesomeIcon icon={faChevronRight} size={'1x'} />
        </Link>
      )}
    </div>
  )
}
