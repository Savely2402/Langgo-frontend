import { createBrowserRouter } from 'react-router'
import { HomePage } from '@/pages/home'
import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { AuthGuard } from './AuthGuard'

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
                        path: '*',
                        lazy: async () => {
                            const { NotFoundPage } =
                                await import('@/pages/not-found')

                            return {
                                Component: NotFoundPage,
                            }
                        },
                    },
                ],
            },
            {
                Component: AuthLayout,
                children: [
                    {
                        path: 'login',
                        lazy: async () => {
                            const { LoginPage } = await import('@/pages/login')

                            return {
                                Component: () => (
                                    <AuthGuard>
                                        <LoginPage />
                                    </AuthGuard>
                                ),
                            }
                        },
                    },
                ],
            },
        ],
    },
])
