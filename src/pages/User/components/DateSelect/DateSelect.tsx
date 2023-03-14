import range from 'lodash/range'
import React, { useEffect, useState } from 'react'

interface DateSelectProps {
  onChange?: (value: Date) => void
  value?: Date
  classNameError?: string
  errorMessage?: string
}

export default function DateSelect({
  classNameError = 'mt-2 text-color-danger col-span-12',
  errorMessage,
  onChange,
  value
}: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1970
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1970
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='grid grid-cols-12 gap-x-2 sm:gap-x-4'>
      <select
        onChange={handleChange}
        name='date'
        value={value ? value.getDate() : date.date}
        className='col-span-4 block h-10 w-full
        border border-gray-300 bg-gray-100 px-3 text-color-text-dark ring-color-primary 
        focus:border-color-primary dark:border-gray-600 dark:focus:border-color-primary sm:text-sm'
      >
        <option disabled value='date'>
          Date
        </option>
        {range(1, 32).map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
      <select
        onChange={handleChange}
        name='month'
        value={value ? value.getMonth() : date.month}
        className='col-span-4 block h-10 w-full
        border border-gray-300 bg-gray-100 px-3 text-color-text-dark ring-color-primary 
        focus:border-color-primary dark:border-gray-600 dark:focus:border-color-primary sm:text-sm'
      >
        <option disabled value='month'>
          Month
        </option>
        {range(0, 12).map((item) => {
          return (
            <option key={item} value={item}>
              {item + 1}
            </option>
          )
        })}
      </select>
      <select
        onChange={handleChange}
        name='year'
        value={value ? value.getFullYear() : date.year}
        className='col-span-4 block h-10 w-full
        border border-gray-300 bg-gray-100 px-3 text-color-text-dark ring-color-primary 
        focus:border-color-primary dark:border-gray-600 dark:focus:border-color-primary sm:text-sm'
      >
        <option disabled value='year'>
          Year
        </option>

        {range(1970, 2023).map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
      </select>
      {errorMessage && <div className={classNameError}>{errorMessage}</div>}
    </div>
  )
}
