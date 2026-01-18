import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])
