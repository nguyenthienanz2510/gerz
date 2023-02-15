import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is require'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email is invalid'
    },
    maxLength: {
      value: 160,
      message: 'Length from 5-160 characters'
    },
    minLength: {
      value: 5,
      message: 'Length from 5-160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is require'
    },
    maxLength: {
      value: 160,
      message: 'Length from 6-160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length from 6-160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is require'
    },
    maxLength: {
      value: 160,
      message: 'Length from 6-160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length from 6-160 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm Password is not same with Password'
        : undefined
  }
})
