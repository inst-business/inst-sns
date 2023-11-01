import { Navigate, Route } from 'react-router-dom'
import { TRoute } from './routes'
import Layout from '@/layouts'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

const routes: TRoute[] = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
]

const RoutesAuth = (
  () => routes.map((route, index) => {
    const isAuthenticated = false
    // let Layout: any = Fragment
    // if (route.layout !== null) Layout = route.layout || Default
    const Page = route.component
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout.Auth>
            {isAuthenticated ? <Navigate to={'/'} /> : <Page />}
          </Layout.Auth>
        }
      />
    )
  })
)()
  
export default RoutesAuth