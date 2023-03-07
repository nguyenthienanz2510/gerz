import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProducts from './components/SortProducts'

export default function HomePage() {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000
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
          <Helmet>
            <title>Home | Gerz E-Commerce</title>
            <meta name='description' content='Home | Gerz E-Commerce' />
          </Helmet>
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
