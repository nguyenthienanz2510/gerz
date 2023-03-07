import { User } from 'src/types/user.type'

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const setUserProfileToLocalStorage = (user_profile: User) => {
  localStorage.setItem('user_profile', JSON.stringify(user_profile))
}

export const getUserProfileFromLocalStorage = () => {
  const result = localStorage.getItem('user_profile')
  return result ? JSON.parse(result) : null
}

export const clearUserProfileFromLocalStorage = () => {
  localStorage.removeItem('user_profile')
}

export const clearLocalStorage = () => {
  clearAccessTokenFromLocalStorage()
  clearUserProfileFromLocalStorage()
  const clearLocalStorageEvent = new Event('clearLocalStorage')
  localStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}
