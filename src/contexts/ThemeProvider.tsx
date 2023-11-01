import { FC, PropsWithChildren, createContext, useContext, useState } from "react"

interface ThemeContext {
  darkTheme: boolean
  toggleTheme: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext)
// const ThemeUpdateContext = createContext<boolean>(true)

export const useTheme = () => useContext(ThemeContext)
// export const useUpdateTheme = () => useContext(ThemeUpdateContext)

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
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