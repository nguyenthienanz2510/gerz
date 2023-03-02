import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchasse'
import { formatCurrency, generateProductSlug } from 'src/utils/utils'

export default function Cart() {
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <div className='overflow-auto'>
      <div className='min-w-[1000px]'>
        <div className='mb-2 grid grid-cols-12 gap-x-4 border border-color-border-primary-dark p-5 text-center font-semibold dark:border-none dark:bg-color-bg-dark-primary'>
          <div className='col-span-5'>
            <div className='flex items-center'>
              <div className='mr-3 flex-shrink-0'>
                <input type='checkbox' />
              </div>
              <div className='flex-grow'>Product</div>
            </div>
          </div>
          <div className='col-span-2'>Unit Price</div>
          <div className='col-span-2'>Qty</div>
          <div className='col-span-2'>Total Price</div>
          <div className='col-span-1'>Action</div>
        </div>
        <div className='border border-color-border-primary-dark'>
          {purchasesInCart?.map((productPurchase) => {
            return (
              <div
                key={productPurchase._id}
                className='grid grid-cols-12 gap-y-5 gap-x-4 border-b border-color-border-primary-dark p-5 text-center dark:mb-1 dark:border-none dark:bg-color-bg-dark-primary'
              >
                <div className='col-span-5'>
                  <div className='flex items-center'>
                    <div className='mr-3 flex-shrink-0'>
                      <input type='checkbox' />
                    </div>
                    <div className='flex flex-grow gap-3'>
                      <Link
                        to={`${path.home}${generateProductSlug({
                          name: productPurchase.product.name,
                          id: productPurchase.product._id
                        })}`}
                      >
                        <div className='inline-block h-24 w-24 overflow-hidden rounded'>
                          <img
                            src={productPurchase.product.image}
                            alt={productPurchase.product.name}
                            title={productPurchase.product.name}
                          />
                        </div>
                      </Link>
                      <Link
                        to={`${path.home}${generateProductSlug({
                          name: productPurchase.product.name,
                          id: productPurchase.product._id
                        })}`}
                      >
                        <span className='text-left font-semibold line-clamp-2'>{productPurchase.product.name}</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='col-span-2'>
                  <div className='flex flex-col items-center justify-center'>
                    <span className='text-center text-14 font-bold text-color-secondary'>
                      {formatCurrency(productPurchase.product.price)} VND
                    </span>
                    <span className='text-12 text-color-text-gray-dark line-through dark:text-color-text-gray-light'>
                      {formatCurrency(productPurchase.product.price_before_discount)} VND
                    </span>
                  </div>
                </div>
                <div className='col-span-2'>
                  <QuantityController
                    // onIncrease={handleBuyCount}
                    // onDecrease={handleBuyCount}
                    // onChangeInputNumber={handleBuyCount}
                    value={productPurchase.buy_count}
                    max={productPurchase.product.quantity}
                  />
                </div>
                <div className='col-span-2'>
                  <span className='text-center text-14 font-bold text-color-secondary'>
                    {formatCurrency(productPurchase.product.price * productPurchase.buy_count)} VND
                  </span>
                </div>
                <div className='col-span-1'>Action</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
