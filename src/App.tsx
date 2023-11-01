import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeProvider'
import { RoutesPublic, RoutesAuth, RoutesPrivate } from '@/routes'
import NotFound from '@/pages/NotFound'

const App = () => {
  return (
    <ThemeProvider>
      <Routes>
        {RoutesPublic}
        {RoutesAuth}
        {RoutesPrivate}
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App