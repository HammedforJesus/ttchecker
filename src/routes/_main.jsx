import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full max-w-[1000px] mx-auto h-svh flex flex-col gap-6'>
      <header className='w-full p-4 flex items-center justify-center'>
        <h1 className='text-3xl'>TTChecker</h1>
      </header>

      <Outlet />

    </div>
  )
}
