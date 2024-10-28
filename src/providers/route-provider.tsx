import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLanding } from '@sw-app/pages/home-landing'
import { FilmDetails } from '@sw-app/pages/film-details'
import { AppPaths } from '@sw-app/types/route-types'

const router = createBrowserRouter([
  { path: AppPaths.ROOT, element: <HomeLanding /> },
  { path: AppPaths.FILM_DETAILS, element: <FilmDetails /> },
])

export function RoutesProvider(): JSX.Element {
  return <RouterProvider router={router} />
}
