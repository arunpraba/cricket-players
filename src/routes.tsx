import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import getPlayers from './utils/api/get-players'

const Layout = React.lazy(() => import('./componets/layout'))
const Players = React.lazy(() => import('./pages/players'))
const PlayerDetail = React.lazy(() => import('./pages/player-detail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Players />,
        loader: async () => {
          try {
            const players = await getPlayers()
            return players
          } catch {
            return []
          }
        },
      },
      {
        path: '/:playerId',
        element: <PlayerDetail />,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
