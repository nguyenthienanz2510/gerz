import { faChevronLeft, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import InputNumber from 'src/components/Form/InputNumber'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify';

export default function ProductDetail() {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const productDetail = data?.data.data
  console.log(productDetail)
  if (!productDetail) return null
  return (
    <div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12 gap-10'>
          <div className='col-span-5'>
            <div className='relative w-full pt-[100%] shadow-lg'>
              <img
                src={productDetail.image}
                alt={productDetail.name}
                title={productDetail.name}
                className='absolute top-0 left-0 h-full w-full'
              />
            </div>
            <div className='relative mt-2 grid grid-cols-5 gap-1'>
              {productDetail.images.slice(0, 5).map((img, index) => {
                const isActive = index === 0
                return (
                  <div className='relative col-span-1 w-full pt-[100%] shadow-md' key={index}>
                    <img
                      src={img}
                      alt={productDetail.name}
                      title={productDetail.name}
                      className='absolute top-0 left-0 h-full w-full cursor-pointer'
                    />
                    {isActive && <div className='absolute inset-0 border-2 border-color-primary'></div>}
                  </div>
                )
              })}
              <button className='absolute left-[2px] top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-color-bg-white-40 transition-all hover:bg-color-bg-white-60'>
                <FontAwesomeIcon icon={faChevronLeft} size={'2x'} color={'#FFCC00'} />
              </button>
              <button className='absolute right-[2px] top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-color-bg-white-40 transition-all hover:bg-color-bg-white-60'>
                {' '}
                <FontAwesomeIcon icon={faChevronRight} size={'2x'} color={'#FFCC00'} />
              </button>
            </div>
          </div>
          <div className='col-span-7 space-y-5'>
            <h1 className='text-xl font-semibold'>{productDetail.name}</h1>
            <div className='flex'>
              <div className='flex items-center gap-2'>
                <span className='text-16 font-semibold text-color-primary underline'>{productDetail.rating}</span>
                <ProductRating rating={productDetail.rating} />
              </div>
              <div className='mx-5 h-5 w-[1px] bg-color-border-primary-dark dark:bg-color-border-primary-light'></div>
              <div className='flex items-center gap-1'>
                <span className='text-16 font-semibold text-color-primary underline'>
                  {formatNumberToSocialStyle(productDetail.sold)}
                </span>
                <span className='font-medium text-color-primary'>Sold</span>
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <span className='text-20 text-color-text-gray-dark line-through dark:text-color-text-gray-light'>
                {formatCurrency(productDetail.price_before_discount)} VND
              </span>
              <span className='text-center text-28 font-bold text-color-secondary'>
                {formatCurrency(productDetail.price)} VND
              </span>
              <div className='rounded bg-color-secondary px-1 text-12 font-medium leading-5 text-color-text-light'>
                Sale {rateSale(productDetail.price_before_discount, productDetail.price)}
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <span>Qty:</span>
              <div className='flex gap-1'>
                <button className='h-10 w-10 rounded-lg border border-color-border-primary-dark transition-all hover:bg-color-primary hover:text-color-text-light dark:border-color-border-primary-light'>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <div className='h-10 w-16'>
                  <InputNumber />
                </div>
                <button className='h-10 w-10 rounded-lg border border-color-border-primary-dark transition-all hover:bg-color-primary hover:text-color-text-light dark:border-color-border-primary-light'>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <span>{productDetail.quantity} In Stock</span>
            </div>
            <div className='flex gap-2'>
              <button className='rounded border border-color-primary bg-color-primary px-6 py-3 text-16 font-semibold text-color-text-light hover:bg-color-primary-active'>
                Add to cart
              </button>
              <button className='rounded border border-color-primary px-6 py-3 text-16 font-semibold text-color-primary'>
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <h4 className='text-18 font-semibold'>Product Detail</h4>
          <div
            className='description mt-4'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}
          />
        </div>
      </div>
    </div>
  )
}
