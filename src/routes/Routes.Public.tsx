import { Route } from 'react-router-dom'
import { TRoute } from './routes'
import Layout from '@/layouts'
import Home from '@/pages/Home'

const routes: TRoute[] = [
  { path: '/', component: Home },
]

const RoutesPublic = (
  () => routes.map((route, index) => {
    const Page = route.component
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout.Root>
            <Page />
          </Layout.Root>
        }
      />
    )
  })
)()
  
export default RoutesPublic