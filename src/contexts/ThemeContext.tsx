import {
  useState, useContext, createContext, FC, PropsWithChildren
} from 'react'
import { IThemeContext } from '@/types/context'

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)
// const ThemeUpdateContext = createContext<boolean>(true)

const useTheme = () => useContext(ThemeContext)
// export const useUpdateTheme = () => useContext(ThemeUpdateContext)

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    setDarkTheme(prevDarkTheme => !prevDarkTheme)
  }

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {/* <ThemeUpdateContext.Provider value={toggleTheme}> */}
        {children}
      {/* </ThemeUpdateContext.Provider> */}
    </ThemeContext.Provider>
  )
}

export {
  useTheme,
  ThemeProvider
}