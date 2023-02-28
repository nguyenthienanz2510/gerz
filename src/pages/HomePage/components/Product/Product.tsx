import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  return (
    <Link to={'/'}>
      <div className='product__cart rounded border border-color-border-primary-dark bg-color-white transition-all hover:border-color-primary dark:border-color-border-primary-light dark:bg-color-bg-dark-primary dark:hover:border-color-primary'>
        <div className='relative w-full overflow-hidden pt-[100%]'>
          <img
            src={product.image}
            alt={product.name}
            title={product.name}
            className='absolute top-0 left-0 h-full w-full'
          />
        </div>
        <div className='flex flex-col items-center gap-2 px-3 pt-3 pb-4'>
          <div className='min-h-[40px]'>
            <span className='text-center line-clamp-2'>{product.name}</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='text-12 text-color-text-gray-dark line-through dark:text-color-text-gray-light'>
              {formatCurrency(product.price_before_discount)} VND
            </span>
            <span className='text-center text-22 font-bold text-color-secondary'>
              {formatCurrency(product.price)} VND
            </span>
          </div>
          <div className='flex w-full items-center justify-between'>
            <ProductRating rating={product.rating} />
            <div className='text-12 text-color-text-dark dark:text-color-text-light'>
              <span className='font-semibold text-color-primary'>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Sold</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
