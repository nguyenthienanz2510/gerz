import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../Form/InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onChangeInputNumber?: (value: number) => void
  classNameWrapper?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onChangeInputNumber,
  classNameWrapper,
  value,
  ...rest
}: QuantityControllerProps) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onChangeInputNumber && onChangeInputNumber(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  return (
    <div className={'flex ' + classNameWrapper}>
      <button
        onClick={decrease}
        className='h-10 w-10 rounded-l-lg border border-color-border-primary-dark border-r-transparent transition-all hover:bg-color-primary hover:text-color-text-light dark:border-color-border-primary-light'
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <InputNumber
        className='w-12'
        classNameInput='focus:border-color-primary border border-color-border-primary-dark transition-all w-full px-2 text-color-text-dark font-semibold text-center h-full dark:border-color-border-primary-light'
        onchange={handleChange}
        value={value || localValue}
        {...rest}
      />
      <button
        onClick={increase}
        className='h-10 w-10 rounded-r-lg border border-color-border-primary-dark border-l-transparent transition-all hover:bg-color-primary hover:text-color-text-light dark:border-color-border-primary-light'
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
