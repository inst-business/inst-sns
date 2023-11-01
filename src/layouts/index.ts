import LayoutDefault from './Layout.Default'
import LayoutAuth from './Layout.Auth'
import LayoutNoPartials from './Layout.NoPartials'

const Layout = (() => {
  return {
    Root: LayoutDefault,
    Auth: LayoutAuth,
    Blank: LayoutNoPartials,
  }
})()

export default Layout