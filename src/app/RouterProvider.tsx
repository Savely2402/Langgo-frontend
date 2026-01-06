import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { AppLayout } from '@/app/layouts/AppLayout'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
    { path: '*', element: <NotFoundPage /> },
])
