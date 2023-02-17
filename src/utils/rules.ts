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

// Rules validation using Yup schema validation
export const schema = yup.object({
  email: yup
    .string()
    .required('Email is require')
    .email('Email is invalid')
    .min(5, 'Length from 5-160 characters')
    .max(160, 'Length from 5-160 characters'),
  password: yup.string().required('').min(6, 'Length from 6-160 characters').max(160, 'Length from 6-160 characters'),
  confirm_password: yup
    .string()
    .required('Confirm password is require')
    .min(6, 'Length from 6-160 characters')
    .max(160, 'Length from 6-160 characters')
    .oneOf([yup.ref('password')], 'Confirm Password is not same with Password')
})

export type Schema = yup.InferType<typeof schema>
