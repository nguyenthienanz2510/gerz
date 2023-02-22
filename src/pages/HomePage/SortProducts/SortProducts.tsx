import React from 'react'

export default function SortProducts() {
  return (
    <div className='rounded bg-color-white py-5 dark:bg-color-bg-dark-primary dark:px-5'>
      Sort By: <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Pupular</span>
      <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Latest</span>
      <span className='mx-1 rounded bg-color-third px-3 py-2 dark:bg-color-bg-dark-secondary'>Price</span>
    </div>
  )
}
