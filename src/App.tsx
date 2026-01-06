import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/RouterProvider'

export const App = () => {
    return <RouterProvider router={router} />
}
