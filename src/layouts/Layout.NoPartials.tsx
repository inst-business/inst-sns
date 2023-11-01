import { FC, PropsWithChildren } from 'react'
// import './styles/global.scss'
import { useTheme } from '@/contexts/ThemeProvider'
import Main from './partials/Main'

const LayoutNoPartials: FC<PropsWithChildren> = ({ children }) => {
  const darkTheme = useTheme()

  // console.log('no partials layout')

  return (
    <>
      <Main>
        {children}
      </Main>
    </>
  )
}

export default LayoutNoPartials