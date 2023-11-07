import { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'
import './styles/global.scss'
import Header from '@/components/shared/Header'
import SideBar from '@/components/shared/SideBar'
import NavigationBar from '@/components/shared/NavigationBar'
// import { useTheme } from '@/contexts/ThemeProvider'

const LayoutRoot: FC<PropsWithChildren> = ({ children }) => {
  // const darkTheme = useTheme()

  return (
    <div className={'w-full md:flex'} style={{ height: '100vh' }}>
      <Header />
      <SideBar />
      <main className={'flex flex-1 h-full'}>
        {children}
      </main>
      <NavigationBar />
    </div>
  )
}

export default LayoutRoot