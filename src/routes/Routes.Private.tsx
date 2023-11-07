import { Route } from 'react-router-dom'
import { TRoute } from '@/types/ui'
import Layout from '@/layouts'
import Admin from '@/pages/Admin'

const routes: TRoute[] = [
  { path: '/admin', component: Admin },
]

const RoutesPrivate = (
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
  
export default RoutesPrivate