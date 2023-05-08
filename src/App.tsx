import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import HostLayout from './components/HostLayout'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/vans/Vans'
import VanDetail from './pages/vans/VanDetail'
import NotFound from './pages/NotFound'
import Dashboard from './pages/host/Dashboard'
import Income from './pages/host/Income'
import Reviews from './pages/host/Reviews'
import HostVans from './pages/host/HostVans'
import HostVanDetail from './pages/host/HostVanDetail'
import HostVanInfo from './pages/host/HostVanInfo'
import HostVanPricing from './pages/host/HostVanPricing'
import HostVanPhotos from './pages/host/HostVanPhotos'
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
          path: "vans",
          element: <Vans />
        },
        {
          path: "vans/:id",
          element: <VanDetail />
        },
        {
          path: "host",
          element: <HostLayout />,
          children: [
            {
              index: true,
              element: <Dashboard />
            },
            {
              path: "income",
              element: <Income />
            },
            {
              path: "reviews",
              element: <Reviews />
            },
            {
              path: "vans",
              element: <HostVans />
            },
            {
              path: "vans/:id",
              element: <HostVanDetail />,
              children: [
                {
                  index: true,
                  element: <HostVanInfo />
                },
                {
                  path: "pricing",
                  element: <HostVanPricing />
                },
                {
                  path: "photos",
                  element: <HostVanPhotos />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
