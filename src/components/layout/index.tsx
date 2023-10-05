import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <p className="font-bold text-inherit">Cricket Players</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}
