import { FC, PropsWithChildren } from 'react'
import './styles/global.scss'
// import { useTheme } from '@/contexts/ThemeProvider'
import Main from './partials/Main'
import Header from './partials/Header'
import Footer from './partials/Footer'
import Sidebar from './partials/Sidebar'

const LayoutDefault: FC<PropsWithChildren> = ({ children }) => {
  // const darkTheme = useTheme()

  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}

export default LayoutDefault