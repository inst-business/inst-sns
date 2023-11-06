import { Navigate, Route } from 'react-router-dom'
import { TRoute } from './routes'
import Layout from '@/layouts'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

const AUTH_ROUTE: Record<Uppercase<string>, TRoute> = {
  LOGIN: { path: '/login', component: Login },
  SIGNUP: { path: '/signup', component: Signup },
} as const

// const AUTH_PATH: AuthPathObject = Object.keys(AUTH_ROUTE).reduce((acc, key) => {
//   const routeKey = key as keyof typeof AUTH_ROUTE
//   acc[routeKey] = AUTH_ROUTE[routeKey].path
//   return acc
// }, {} as AuthPathObject)

// AUTH_PATH.LOGIN

const RoutesAuth = (
  () => Object.values(AUTH_ROUTE).map((route, index) => {
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