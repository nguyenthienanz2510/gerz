import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from './context/app.context'
import UserLayout from './pages/User/layouts/UserLayout'
import path from './constant/path'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import HomePage from './pages/HomePage'
// import NotFound from './pages/NotFound'
// import ProductDetail from './pages/ProductDetail'
// import Cart from './pages/Cart'
// import HistoryPurchase from './pages/User/pages/HistoryPurchase'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import Profile from './pages/User/pages/Profile'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import FAQ from './pages/FAQ'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const HomePage = lazy(() => import('./pages/HomePage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Cart = lazy(() => import('./pages/Cart'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <HomePage />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.about,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <About />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.contact,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <Contact />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.faq,
      index: true,
      element: (
        <MainLayout>
          <FAQ />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routeElements
}
