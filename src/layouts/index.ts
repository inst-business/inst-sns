import LayoutRoot from './Layout.Root'
import LayoutAuth from './Layout.Auth'
import LayoutNoPartials from './Layout.NoPartials'

const Layout = (() => {
  return {
    Root: LayoutRoot,
    Auth: LayoutAuth,
    Blank: LayoutNoPartials,
  }
})()

export default Layout