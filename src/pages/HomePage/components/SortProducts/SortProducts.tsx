import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import { sortBy, order as orderConstant } from 'src/constant/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProducts({ queryConfig, pageSize }: PaginationProps) {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const { page } = queryConfig
  const navigate = useNavigate()
  const { t } = useTranslation(['home'])

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by == sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
            page: '1'
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='flex flex-col items-start justify-between gap-2 rounded bg-color-white py-3 dark:bg-color-bg-dark-primary dark:px-5 sm:flex-row sm:items-center'>
      <div className='flex flex-wrap items-center gap-2'>
        {t('home:sortBy')}:{' '}
        <button
          className={classNames('h-9 rounded px-3 hover:bg-color-primary-active  dark:hover:bg-color-primary-active', {
            'bg-color-primary': isActiveSortBy(sortBy.view),
            'bg-color-third dark:bg-color-bg-dark-secondary': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => {
            handleSort(sortBy.view)
          }}
        >
          {t('home:popular')}
        </button>
        <button
          className={classNames('h-9 rounded px-3 hover:bg-color-primary-active  dark:hover:bg-color-primary-active', {
            'bg-color-primary': isActiveSortBy(sortBy.createdAt),
            'bg-color-third dark:bg-color-bg-dark-secondary': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => {
            handleSort(sortBy.createdAt)
          }}
        >
          {t('home:latest')}
        </button>
        <button
          className={classNames('h-9 rounded px-3 hover:bg-color-primary-active  dark:hover:bg-color-primary-active', {
            'bg-color-primary': isActiveSortBy(sortBy.sold),
            'bg-color-third dark:bg-color-bg-dark-secondary': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => {
            handleSort(sortBy.sold)
          }}
        >
          {t('home:topSales')}
        </button>
        <select
          value={order || ''}
          onChange={(event) => {
            handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
          }}
          className={classNames('h-9 rounded px-3 hover:bg-color-primary-active dark:hover:bg-color-primary-active', {
            'bg-color-primary': isActiveSortBy(sortBy.price),
            'bg-color-third dark:bg-color-bg-dark-secondary': !isActiveSortBy(sortBy.price)
          })}
        >
          <option value='' disabled>
          {t('home:price')}
          </option>
          <option value={orderConstant.asc}>{t('home:priceLowToHight')}</option>
          <option value={orderConstant.desc}>{t('home:priceHightToLow')}</option>
        </select>
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex gap-[2px]'>
          <span className='font-semibold text-color-primary'>{page}</span>
          <span>/</span>
          <span>{pageSize}</span>
        </div>
        <div className='flex'>
          {Number(page) === 1 ? (
            <span className='flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-tl rounded-bl bg-color-third dark:bg-color-bg-dark-secondary'>
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
                search: createSearchParams({ ...queryConfig, page: (Number(page) - 1).toString() }).toString()
              }}
              className='flex h-9 w-9 items-center justify-center rounded-tl rounded-bl bg-color-third px-4 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={'1x'}
                className='text-color-text-dark dark:text-color-text-light'
              />
            </Link>
          )}
          <div className='h-9 border-r border-color-border-primary-dark dark:border-color-border-primary-light'></div>
          {Number(page) === pageSize ? (
            <span className='flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-tr rounded-br bg-color-third dark:bg-color-bg-dark-secondary'>
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
                search: createSearchParams({ ...queryConfig, page: (Number(page) + 1).toString() }).toString()
              }}
              className='flex h-9 w-9 items-center justify-center rounded-tr rounded-br bg-color-third px-4 hover:bg-color-primary-active dark:bg-color-bg-dark-secondary dark:hover:bg-color-primary-active'
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                size={'1x'}
                className='text-color-text-dark dark:text-color-text-light'
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
