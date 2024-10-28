import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLanding } from '@sw-app/pages/home-landing'
import { FilmDetails } from '@sw-app/pages/film-details'

const router = createBrowserRouter([
  { path: '/', element: <HomeLanding /> },
  { path: '/film/:id', element: <FilmDetails /> },
])

export function RoutesProvider(): JSX.Element {
  return <RouterProvider router={router} />
}
