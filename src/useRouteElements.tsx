import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routeElements
}
