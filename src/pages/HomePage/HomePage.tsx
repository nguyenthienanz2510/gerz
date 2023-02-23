import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProducts from './SortProducts'

export default function HomePage() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-12'>
        <div className='md:col-span-3'>
          <AsideFilter />
        </div>
        <div className='md:col-span-9'>
          <SortProducts />
          <div className='mt-7 grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-x-5 md:gap-y-7 xl:grid-cols-4'>
            {Array(30)
              .fill(0)
              .map((_, index) => {
                return (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
