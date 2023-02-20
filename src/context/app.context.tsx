import React, { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getUserProfileFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userProfile: User | null
  setUserProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userProfile: getUserProfileFromLocalStorage(),
  setUserProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userProfile, setUserProfile] = useState<User | null>(initialAppContext.userProfile)
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, userProfile, setUserProfile }}>
      {children}
    </AppContext.Provider>
  )
}
