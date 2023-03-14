import React from 'react'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { schema, Schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constant/path'
import omit from 'lodash/omit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

type FormData = Pick<Schema, 'search'>
const searchSchema = schema.pick(['search'])

export default function SearchProduct() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: ''
    },
    resolver: yupResolver(searchSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            name: data.search
          },
          ['order', 'sort_by', 'rating_filter', 'price_min', 'price_max']
        )
      ).toString()
    })
  })
  return (
    <form onSubmit={onSubmitSearch} className='relative'>
      <input
        placeholder='Search...'
        type='text'
        className='focus:border-color block w-full border border-gray-300 bg-gray-100 py-4 px-3 text-14 text-color-text-dark sm:py-2 sm:px-3'
        {...register('search')}
      />
      <button className='absolute top-0 right-0 h-full w-10'>
        <FontAwesomeIcon
          icon={faSearch}
          size={'lg'}
          className='text-color-text-dark transition-all hover:text-color-primary'
        />
      </button>
    </form>
  )
}
