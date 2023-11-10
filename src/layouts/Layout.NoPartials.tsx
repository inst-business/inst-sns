import { FC, PropsWithChildren } from 'react'
// import './styles/global.scss'
import { useTheme } from '@/contexts/ThemeContext'

const LayoutNoPartials: FC<PropsWithChildren> = ({ children }) => {
  const darkTheme = useTheme()

  // console.log('no partials layout')

  return (
    <>
      {children}
    </>
  )
}

export default LayoutNoPartials