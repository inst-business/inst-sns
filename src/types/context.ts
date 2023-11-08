import React from 'react'
import { IUser, IUserDocument } from './user'

export interface IAuthContext {
  user: IUser
  isLoading: boolean
  isAuthenticated: boolean
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthUser: () => Promise<boolean>
}

export interface IThemeContext {
  darkTheme: boolean
  toggleTheme: (dark: boolean) => void
}