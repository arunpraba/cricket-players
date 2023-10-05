import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import getPlayers, { getPlayer } from './utils/api/get-players'
import Loader from './components/loader'

const Layout = React.lazy(() => import('./components/layout'))
const Players = React.lazy(() => import('./pages/players'))
const PlayerDetail = React.lazy(() => import('./pages/player-detail'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        id: 'players',
        element: (
          <Suspense fallback={<Loader />}>
            <Players />
          </Suspense>
        ),
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
        id: 'player-detail',
        loader: async ({ params }) => {
          try {
            console.log({ params })
            const { playerId } = params
            if (!playerId) return null
            const player = await getPlayer({ playerId })
            return player
          } catch {
            return null
          }
        },
        element: (
          <Suspense fallback={<Loader />}>
            <PlayerDetail />
          </Suspense>
        ),
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
