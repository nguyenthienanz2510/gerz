import { faChevronLeft, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromProductSlug, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import Product from '../HomePage/components/Product'
import QuantityController from 'src/components/QuantityController'

export default function ProductDetail() {
  const { productSlug } = useParams()
  const id = getIdFromProductSlug(productSlug as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const productDetail = data?.data.data

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const [buyCount, setBuyCount] = useState(1)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const currentImages = useMemo(
    () => (productDetail ? productDetail.images.slice(...currentIndexImages) : []),
    [productDetail, currentIndexImages]
  )

  const queryConfig: ProductListConfig = { limit: 12, page: 1, category: productDetail?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(productDetail),
    staleTime: 2 * 60 * 1000
  })

  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const sliderImageNext = () => {
    if (currentIndexImages[1] < (productDetail as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const sliderImagePrev = () => {
    if (currentIndexImages[0] !== 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleImageZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveImageZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  if (!productDetail) return null
  return (
    <div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-12 gap-y-7 sm:gap-10'>
          <div className='col-span-12 sm:col-span-5'>
            <div
              className='relative w-full overflow-hidden pt-[100%] shadow-lg hover:cursor-zoom-in'
              onMouseMove={handleImageZoom}
              onMouseLeave={handleRemoveImageZoom}
            >
              <img
                src={activeImage}
                alt={productDetail.name}
                title={productDetail.name}
                className='pointer-events-none absolute top-0 left-0 h-full w-full'
                ref={imageRef}
              />
            </div>
            <div className='relative mt-2 grid grid-cols-5 gap-1'>
              {currentImages.slice(0, 5).map((img, index) => {
                const isActive = img === activeImage
                return (
                  <div
                    className='relative col-span-1 w-full pt-[100%] shadow-md'
                    key={index}
                    onMouseEnter={() => chooseActiveImage(img)}
                  >
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
              <button
                className='absolute left-[2px] top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-color-bg-white-40 transition-all hover:bg-color-bg-white-60'
                onClick={sliderImagePrev}
              >
                <FontAwesomeIcon icon={faChevronLeft} size={'2x'} color={'#FFCC00'} />
              </button>
              <button
                className='absolute right-[2px] top-1/2 z-10 h-10 w-10 -translate-y-1/2 bg-color-bg-white-40 transition-all hover:bg-color-bg-white-60'
                onClick={sliderImageNext}
              >
                {' '}
                <FontAwesomeIcon icon={faChevronRight} size={'2x'} color={'#FFCC00'} />
              </button>
            </div>
          </div>
          <div className='col-span-12 space-y-3 sm:col-span-7 sm:space-y-4 lg:space-y-5'>
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
            <div className='flex flex-wrap items-center gap-x-5'>
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
              <QuantityController
                onIncrease={handleBuyCount}
                onDecrease={handleBuyCount}
                onChangeInputNumber={handleBuyCount}
                value={buyCount}
                max={productDetail.quantity}
              />
              <span>{productDetail.quantity} In Stock</span>
            </div>
            <div className='flex gap-2'>
              <button className='rounded border border-color-primary bg-color-primary px-6 py-3 text-16 font-semibold text-color-text-light hover:bg-color-primary-active'>
                Add to cart
              </button>
              <button className='rounded border border-color-primary px-6 py-3 text-16 font-semibold text-color-primary hover:border-color-primary-active hover:text-color-primary-active'>
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <h4 className='text-20 font-semibold'>Product Detail</h4>
          <div
            className='description mt-4'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}
          />
        </div>
        <div className='mt-10'>
          <h4 className='mb-4 text-20 font-semibold'>You may also like</h4>
          <div className='grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 md:gap-y-7 xl:grid-cols-5'>
            {productsData &&
              productsData.data.data.products.map((product) => {
                return (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
