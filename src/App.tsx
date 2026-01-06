import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/RouterProvider.tsx'

export const App = () => {
    return <RouterProvider router={router} />
}
