import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import produce from 'immer'
import { keyBy } from 'lodash'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchasse'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateProductSlug } from 'src/utils/utils'

interface ExtendedPurchases extends Purchase {
  disable: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExendedPurchases] = useState<ExtendedPurchases[]>([])

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        autoClose: 2 * 1000
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const isAllChecked = extendedPurchases.length > 0 && extendedPurchases.every((item) => item.checked)

  const checkedPurchases = extendedPurchases.filter((item) => item.checked)
  const checkedPurchasesCount = checkedPurchases.length

  const totalCheckedPurchasesPrice = checkedPurchases.reduce(
    (result, current) => result + current.product.price * current.buy_count,
    0
  )

  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce(
    (result, current) => result + (current.product.price_before_discount - current.product.price) * current.buy_count,
    0
  )

  useEffect(() => {
    setExendedPurchases((prev) => {
      const ExendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((item) => ({
          ...item,
          disable: false,
          checked: Boolean(ExendedPurchasesObject[item._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExendedPurchases((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked
      }))
    )
  }

  const handlePurchaseQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disable = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleChangeInputPurchaseQuantity = (purchaseIndex: number) => (value: number) => {
    setExendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeletePurchases = () => {
    const purchaseIds = checkedPurchases.map((item) => item._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyProducts = () => {
    if (checkedPurchasesCount > 0) {
      const body = checkedPurchases.map((item) => ({
        product_id: item.product._id,
        buy_count: item.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Cart | Gerz E-Commerce</title>
        <meta name='description' content='Cart | Gerz E-Commerce' />
      </Helmet>
      <div className='overflow-auto'>
        <div className='min-w-[1000px]'>
          <div className='mb-2 grid grid-cols-12 gap-x-4 border border-color-border-primary-dark p-5 text-center font-semibold shadow-sm dark:border-none dark:bg-color-bg-dark-primary'>
            <div className='col-span-5'>
              <div className='flex items-center'>
                <div className='mr-3 flex-shrink-0'>
                  <input type='checkbox' className='h-4 w-4' checked={isAllChecked} onChange={handleCheckedAll} />
                </div>
                <div className='flex-grow'>Product</div>
              </div>
            </div>
            <div className='col-span-2'>Unit Price</div>
            <div className='col-span-2'>Qty</div>
            <div className='col-span-2'>Total Price</div>
            <div className='col-span-1'>Action</div>
          </div>
          {extendedPurchases.length ? (
            <div className='border border-color-border-primary-dark'>
              {extendedPurchases.map((productPurchase, index) => {
                return (
                  <div
                    key={productPurchase._id}
                    className='grid grid-cols-12 gap-y-5 gap-x-4 border-b border-color-border-primary-dark p-5 text-center last:border-none dark:mb-1 dark:border-none dark:bg-color-bg-dark-primary dark:last:mb-0'
                  >
                    <div className='col-span-5'>
                      <div className='flex items-center'>
                        <div className='mr-3 flex-shrink-0'>
                          <input
                            type='checkbox'
                            className='h-4 w-4'
                            checked={productPurchase.checked}
                            onChange={handleChecked(index)}
                          />
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
                        <span className='text-center text-14 font-semibold'>
                          {formatCurrency(productPurchase.product.price)} VND
                        </span>
                        <span className='text-12 text-color-text-gray-dark line-through dark:text-color-text-gray-light'>
                          {formatCurrency(productPurchase.product.price_before_discount)} VND
                        </span>
                      </div>
                    </div>
                    <div className='col-span-2 flex items-start justify-center'>
                      <QuantityController
                        value={productPurchase.buy_count}
                        max={productPurchase.product.quantity}
                        disabled={productPurchase.disable}
                        onIncrease={(value) => {
                          handlePurchaseQuantity(
                            index,
                            value,
                            productPurchase.buy_count < productPurchase.product.quantity
                          )
                        }}
                        onDecrease={(value) => {
                          handlePurchaseQuantity(index, value, productPurchase.buy_count > 1)
                        }}
                        onChangeInputNumber={handleChangeInputPurchaseQuantity(index)}
                        onFocusOut={(value) => {
                          handlePurchaseQuantity(
                            index,
                            value,
                            productPurchase.buy_count >= 1 &&
                              productPurchase.buy_count <= productPurchase.product.quantity &&
                              value !== (purchasesInCart as Purchase[])[index].buy_count
                          )
                        }}
                      />
                    </div>
                    <div className='col-span-2'>
                      <span className='text-center text-14 font-semibold text-color-secondary'>
                        {formatCurrency(productPurchase.product.price * productPurchase.buy_count)} VND
                      </span>
                    </div>
                    <div className='col-span-1'>
                      <button
                        onClick={handleDeletePurchase(index)}
                        className='text-color-danger transition-all hover:font-semibold hover:underline'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className='border border-color-border-primary-dark p-5'>
              No Products in Cart!{' '}
              <Link className='text-color-primary' to={path.home}>
                Go to shop now!
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='sticky bottom-0 z-10 mt-2 border border-color-border-primary-dark bg-color-white px-5 py-8 shadow-sm dark:border-0 dark:border-t dark:border-t-color-bg-dark-secondary dark:bg-color-bg-dark-primary'>
        <div className='flex flex-col justify-between gap-5 sm:flex-row'>
          <div className='flex items-start gap-2'>
            <input
              type='checkbox'
              className='h-4 w-4'
              id='selectAll'
              checked={isAllChecked}
              onChange={handleCheckedAll}
            />
            <label className='cursor-pointer font-semibold' htmlFor='selectAll'>
              Select All ({purchasesInCart?.length})
            </label>
            <button
              onClick={handleDeletePurchases}
              className='text-color-danger transition-all hover:font-semibold hover:underline'
            >
              Remove {Boolean(checkedPurchasesCount) && `(${checkedPurchasesCount})`}
            </button>
          </div>
          <div className='flex flex-col items-start gap-5 sm:flex-row'>
            <div className='flex flex-col gap-1 sm:items-end'>
              <div>
                <span>Total Payment ({checkedPurchasesCount} Product):</span>
                <span className='ml-2 text-16 font-semibold text-color-secondary'>
                  {formatCurrency(totalCheckedPurchasesPrice)} VND
                </span>
              </div>
              <div>
                <span>Saving:</span>
                <span className='ml-2'>{formatCurrency(totalCheckedPurchasesSavingPrice)} VND</span>
              </div>
            </div>
            <div className='w-full sm:w-auto sm:flex-shrink-0'>
              <button
                disabled={buyProductsMutation.isLoading || Boolean(!checkedPurchasesCount)}
                onClick={handleBuyProducts}
                className={classNames(
                  'w-full rounded border border-color-primary px-6 py-3 text-16 font-semibold text-color-primary transition-all',
                  {
                    'cursor-not-allowed': buyProductsMutation.isLoading || Boolean(!checkedPurchasesCount),
                    'hover:border-color-primary-active hover:bg-color-primary-active hover:text-color-text-light':
                      Boolean(checkedPurchasesCount)
                  }
                )}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
