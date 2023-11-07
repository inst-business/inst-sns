import { Route } from 'react-router-dom'
import { TRoute } from '@/types/ui'
import Layout from '@/layouts'
import Home from '@/pages/Home'
import AllUsers from '@/pages/AllUsers'
import Saved from '@/pages/Saved'
import Explore from '@/pages/Explore'
import Post from '@/pages/Post'
import Profile from '@/pages/Profile'

const routes: TRoute[] = [
  { path: '/', component: Home },
  { path: '/explore', component: Explore },
  { path: '/saved', component: Saved },
  { path: '/all-users', component: AllUsers },
  { path: '/create', component: Post.Create },
  { path: '/posts/:id/edit', component: Post.Edit },
  { path: '/posts/:id', component: Post.Details },
  { path: '/profile/:id/edit', component: Profile.Edit },
  { path: '/profile/:id/*', component: Profile.Details },
]

const RoutesPublic = (
  () => routes.map((route, index) => {
    const Page = route.component
    return (
      <Route
        // index={route.path === '/'}
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