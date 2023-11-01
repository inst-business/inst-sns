import { FC, PropsWithChildren } from 'react'
import './styles/global.scss'
// import { useTheme } from '@/contexts/ThemeProvider'

const LayoutAuth: FC<PropsWithChildren> = ({ children }) => {
  // const darkTheme = useTheme()

  return (
    <>
      <main className={'h-screen flex flex-col flex-1 justify-center items-center py-10'}>
        {children}
      </main>
    </>
  )
}

export default LayoutAuth