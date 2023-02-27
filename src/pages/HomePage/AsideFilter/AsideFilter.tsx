import { faCaretRight, faLeaf, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import InputNumber from 'src/components/Form/InputNumber'
import path from 'src/constant/path'
import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { QueryConfig } from '../HomePage'

interface AsideFilterProps {
  queryConfig: QueryConfig
  categories: Category[]
}

type formData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ categories, queryConfig }: AsideFilterProps) {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<formData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  console.log(errors)

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  return (
    <div className='space-y-5 rounded border border-color-border-primary-dark p-5 dark:border-none dark:bg-color-bg-dark-primary'>
      <div>
        <h4 className='mb-3 border-b border-color-border-primary-dark pb-3 font-semibold dark:border-color-border-primary-light'>
          ALL CATEGORIES
        </h4>
        <ul className='space-y-1 pl-5'>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li key={categoryItem._id} className='relative'>
                {(isActive || !category) && (
                  <div className='absolute -left-4 flex h-7 items-center'>
                    <FontAwesomeIcon icon={faCaretRight} size={'1x'} color={'#FFCC00'} />
                  </div>
                )}
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('inline-block py-1', {
                    'text-color-primary': isActive || !category
                  })}
                >
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h4 className='mb-3 border-b border-color-border-primary-dark pb-3 font-semibold dark:border-color-border-primary-light'>
          FILTERS
        </h4>
        <div>
          <h5 className='mb-3 font-semibold'>Price Range</h5>
          <form onSubmit={onSubmit}>
            <div className='flex items-center gap-2'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      classNameError='mt-0'
                      className='grow'
                      placeholder='from'
                      {...field}
                      onchange={(event) => {
                        field.onChange(event)
                        trigger('price_max')
                      }}
                    />
                  )
                }}
              />
              <div>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      classNameError='mt-0'
                      className='grow'
                      placeholder='to'
                      {...field}
                      onchange={(event) => {
                        field.onChange(event)
                        trigger('price_min')
                      }}
                    />
                  )
                }}
              />
            </div>
            <div className='mt-2 text-center text-color-danger'>{errors.price_min?.message}</div>
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
