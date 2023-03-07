import React, { createContext, useState } from 'react'
import { ExtendedPurchases } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLocalStorage, getUserProfileFromLocalStorage } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userProfile: User | null
  setUserProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLocalStorage()),
  setIsAuthenticated: () => null,
  userProfile: getUserProfileFromLocalStorage(),
  setUserProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userProfile, setUserProfile] = useState<User | null>(initialAppContext.userProfile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(initialAppContext.extendedPurchases)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        extendedPurchases,
        setExtendedPurchases
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
