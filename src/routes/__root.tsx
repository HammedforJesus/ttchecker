import { createRootRoute, Outlet } from '@tanstack/react-router'

const RootLayout = () => (
    <div className='w-full max-w-[1000px] mx-auto h-svh flex flex-col gap-6'>
      <header className='w-full p-4 flex items-center justify-center'>
        <h1 className='text-3xl'>TTChecker</h1>
      </header>

      <Outlet />

    </div>
)

export const Route = createRootRoute({ component: RootLayout })