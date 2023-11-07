import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import './styles/global.scss'
import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import Footer from '@/components/shared/Footer'
// import { useTheme } from '@/contexts/ThemeProvider'

const LayoutRoot: FC<PropsWithChildren> = ({ children }) => {
  // const darkTheme = useTheme()

  return (
    <div className={'w-full md:flex'} style={{ height: '100vh' }}>
      <Header />
      <Sidebar />
      <main className={'flex flex-1 h-full'}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default LayoutRoot