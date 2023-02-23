import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProducts from './SortProducts'

export default function HomePage() {
  const queryParams = useQueryParams()

  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
        <div className='md:col-span-3'>
          <AsideFilter />
        </div>
        <div className='md:col-span-9'>
          <SortProducts />
          <div className='mt-7 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 md:gap-y-7 xl:grid-cols-4'>
            {data &&
              data.data.data.products.map((product) => {
                return (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
