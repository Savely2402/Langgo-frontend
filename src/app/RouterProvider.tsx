import { createBrowserRouter } from 'react-router'
import { AppLayout } from '@/app/layouts/AppLayout'
import { HomePage } from '@/pages/home'

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                Component: AppLayout,
                children: [
                    {
                        index: true,
                        Component: HomePage,
                    },
                    {
                        path: 'login',
                        lazy: async () => {
                            const { LoginPage } = await import('@/pages/login')

                            return {
                                Component: LoginPage,
                            }
                        },
                    },
                ],
            },

            {
                path: '*',
                lazy: async () => {
                    const { NotFoundPage } = await import('@/pages/not-found')

                    return {
                        Component: NotFoundPage,
                    }
                },
            },
        ],
    },
])
