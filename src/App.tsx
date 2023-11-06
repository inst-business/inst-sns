import { Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { RoutesPublic, RoutesAuth, RoutesPrivate } from '@/routes'
import NotFound from '@/pages/NotFound'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {RoutesPublic}
          {RoutesAuth}
          {RoutesPrivate}
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App