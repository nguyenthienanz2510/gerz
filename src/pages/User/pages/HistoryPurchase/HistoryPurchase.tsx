import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import React from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constant/path'
import { purchasesStatus } from 'src/constant/purchasse'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateProductSlug } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'All' },
  { status: purchasesStatus.waitForConfirmation, name: 'Wait for confirmation' },
  { status: purchasesStatus.waitForGetting, name: 'Wait for getting' },
  { status: purchasesStatus.inProgress, name: 'In progress' },
  { status: purchasesStatus.inDelivered, name: 'In delivered' },
  { status: purchasesStatus.canceled, name: 'Canceled' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all

  const { data: purchasesData } = useQuery({
    queryKey: ['purchases', { status: status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchases = purchasesData?.data.data

  return (
    <div className='overflow-x-auto'>
      <div className='min-w-[700px]'>
        <div className='flex shadow-sm'>
          {purchaseTabs.map((tab) => (
            <Link
              key={tab.status}
              to={{
                pathname: path.historyPurchase,
                search: createSearchParams({
                  status: String(tab.status)
                }).toString()
              }}
              className={classNames('flex flex-1 items-center justify-center border-b-2 py-4 text-center', {
                'border-b-color-primary text-color-primary': status === tab.status
              })}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        <div>
          {purchases?.map((purchase) => {
            return (
              <div key={purchase._id} className='mt-4 rounded border p-4 shadow-sm'>
                <Link
                  to={`${path.home}${generateProductSlug({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex gap-3'
                >
                  <div className='flex-shrink-0'>
                    <img
                      src={purchase.product.image}
                      alt={purchase.product.name}
                      title={purchase.product.name}
                      className='h-20 w-20'
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='text-truncate-1'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='flex-shrink-0'>
                    <span className='mt-3 text-12 text-color-text-gray-dark line-through dark:text-color-text-gray-light'>
                      {formatCurrency(purchase.product.price_before_discount)} VND
                    </span>
                    <span className='ml-2 text-center text-14 font-bold text-color-primary'>
                      {formatCurrency(purchase.product.price)} VND
                    </span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  Total:
                  <span className='ml-2 text-center text-16 font-bold text-color-secondary'>
                    {formatCurrency(purchase.product.price * purchase.buy_count)} VND
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
