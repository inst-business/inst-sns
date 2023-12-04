import {
  useState, useEffect, useContext, createContext, FC, PropsWithChildren
} from 'react'
import { useNavigate } from 'react-router-dom'
import { IUser } from '@/types/user'
import { IAuthContext } from '@/types/context'
import { getCurrentUser } from '@/services/api'
import { cookieFallBack } from '@/services/localStorage'

const initUser: IUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
}

const initState: IAuthContext = {
  user: initUser,
  isUserLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
}

const AuthContext = createContext<IAuthContext>(initState)

const useAuthContext = () => useContext(AuthContext)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>(initUser)
  const [isLoading, setIsLoading] = useState<IAuthContext['isUserLoading']>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<IAuthContext['isAuthenticated']>(false)

  const navigate = useNavigate()

  const checkAuthUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) return false
      setUser({ ...currentUser, id: currentUser.$id })
      setIsAuthenticated(true)
      return true      
    }
    catch (e) {
      console.error(e)
      return false
    }
    finally {
      setIsLoading(false)
    }
  }

  const provider = {
    user,
    isUserLoading: isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser
  }

  useEffect(() => {
    if (cookieFallBack.isEmpty) return navigate('/login')
    checkAuthUser()
  }, [])
  
  return (
    <AuthContext.Provider value={provider}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  useAuthContext,
  AuthProvider
}