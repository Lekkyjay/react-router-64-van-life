import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import HostLayout from './components/HostLayout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import About from './pages/About'
import Vans, { vansLoader } from './pages/vans/Vans'
import VanDetail, { vanDetailLoader } from './pages/vans/VanDetail'
import NotFound from './pages/NotFound'
import Dashboard, { dashBoardLoader } from './pages/host/Dashboard'
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostVans, { hostVansLoader } from './pages/host/HostVans'
import HostVanDetail, { hostVanDetailLoader } from './pages/host/HostVanDetail'
import HostVanInfo from './pages/host/HostVanInfo'
import HostVanPricing from './pages/host/HostVanPricing'
import HostVanPhotos from './pages/host/HostVanPhotos'
import Characters from './pages/Characters'
import Login, { loginAction, loginLoader } from './pages/Login'
import { requireAuth } from './utils'
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,              //path: ""    empty path works as well
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "login",
          element: <Login />,
          loader: loginLoader,
          action: loginAction
        },
        {
          path: "vans",
          element: <Vans />,
          errorElement: <ErrorBoundary />,
          loader: vansLoader
        },
        {
          path: "vans/:id",
          element: <VanDetail />,
          errorElement: <ErrorBoundary />,
          loader: vanDetailLoader
        },
        {
          path: "host",
          element: <HostLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: dashBoardLoader
            },
            {
              path: "income",
              element: <Income />,
              loader: async ({ request }) => await requireAuth(request)
            },
            {
              path: "reviews",
              element: <Reviews />,
              loader: async ({ request }) => await requireAuth(request)
            },
            {
              path: "vans",
              element: <HostVans />,
              errorElement: <ErrorBoundary />,
              loader: hostVansLoader
            },
            {
              path: "vans/:id",
              element: <HostVanDetail />,     //component layout
              errorElement: <ErrorBoundary />,
              loader: hostVanDetailLoader,  
              children: [
                {
                  index: true,
                  element: <HostVanInfo />,
                  loader: async ({ request }) => await requireAuth(request)
                },
                {
                  path: "pricing",
                  element: <HostVanPricing />,
                  loader: async ({ request }) => await requireAuth(request)
                },
                {
                  path: "photos",
                  element: <HostVanPhotos />,
                  loader: async ({ request }) => await requireAuth(request)
                }
              ]
            }
          ]
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: "/characters",
      element: <Characters />
    }        
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
