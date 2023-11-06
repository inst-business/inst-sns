import { FC, PropsWithChildren } from 'react'
import styles from './header.module.scss'
import HeaderBrand from './Header.Brand'
import HeaderSearch from './Header.Search'
import HeaderMenu from './Header.Menu'

const Header: FC<PropsWithChildren> = ({}) => {
  return (
    <>
      <HeaderBrand />
      <HeaderSearch />
      <HeaderMenu />
    </>
  )
}

export default Header