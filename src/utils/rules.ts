// import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

// Rules validation using react-hook-from core
// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email is require'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email is invalid'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 5-160 characters'
//     },
//     minLength: {
//       value: 5,
//       message: 'Length from 5-160 characters'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password is require'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 6-160 characters'
//     },
//     minLength: {
//       value: 6,
//       message: 'Length from 6-160 characters'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Confirm password is require'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length from 6-160 characters'
//     },
//     minLength: {
//       value: 6,
//       message: 'Length from 6-160 characters'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Confirm Password is not same with Password'
//         : undefined
//   }
// })

function testPrice(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

function handleConfirmPasswordYup(refString: string, errorMessage?: string) {
  return yup
    .string()
    .required('Confirm password is require')
    .min(6, 'Length from 6-160 characters')
    .max(160, 'Length from 6-160 characters')
    .oneOf([yup.ref(refString)], errorMessage || 'Confirm password is not same with Password')
}

// Rules validation using Yup schema validation
export const schema = yup.object({
  email: yup
    .string()
    .required('Email is require')
    .email('Email is invalid')
    .min(5, 'Length from 5-160 characters')
    .max(160, 'Length from 5-160 characters'),
  password: yup.string().required('').min(6, 'Length from 6-160 characters').max(160, 'Length from 6-160 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  confirm_new_password: handleConfirmPasswordYup('new_password', 'Confirm new password is not same with new password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid price',
    test: testPrice
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid price',
    test: testPrice
  }),
  search: yup.string().trim().required('Product name is required')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Max length is 160 characters'),
  phone: yup.string().max(20, 'Max length is 20 characters'),
  address: yup.string().max(160, 'Max length is 160 characters'),
  avatar: yup.string().max(1000, 'Max length is 1000 characters'),
  date_of_birth: yup.date().max(new Date(), 'Invalid Date of birth'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password'],
  confirm_new_password: schema.fields['confirm_new_password']
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
