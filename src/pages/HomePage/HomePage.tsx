import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { useState } from 'react'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryParams from 'src/hooks/useQueryParams'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProducts from './SortProducts'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function HomePage() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '12',
      order: queryParams.order,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productsData } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  return (
    <>
      {productsData && (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
          <div className='md:col-span-3'>
            <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
          </div>
          <div className='md:col-span-9'>
            <SortProducts queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            <div className='mt-7 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 md:gap-y-7 xl:grid-cols-4'>
              {productsData &&
                productsData.data.data.products.map((product) => {
                  return (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  )
                })}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
          </div>
        </div>
      )}
    </>
  )
}
