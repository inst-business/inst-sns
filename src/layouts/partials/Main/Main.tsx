import { FC, PropsWithChildren } from 'react'
// import styles from './main.module.scss'

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={'flex h-screen'}>
      {children}
    </main>
  )
}

export default Main