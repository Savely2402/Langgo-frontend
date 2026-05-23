import { createBrowserRouter } from 'react-router'
import { GameSetupPage } from '@/pages/game-setup'
import { HomePage } from '@/pages/home'
import { MatchRoomPage } from '@/pages/match-room'
import { routes, routeSegments } from '@/shared/config'
import { AppLayout } from '../layouts/AppLayout'
import { AuthGuard } from './AuthGuard'

export const router = createBrowserRouter([
    {
        Component: AppLayout,
        path: routes.home,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: routes.notFound,
                lazy: async () => {
                    const { NotFoundPage } = await import('@/pages/not-found')

                    return {
                        Component: NotFoundPage,
                    }
                },
            },

            {
                path: routeSegments.login,
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
            {
                path: routeSegments.register,
                lazy: async () => {
                    const { RegisterPage } = await import('@/pages/register')

                    return {
                        Component: () => (
                            <AuthGuard>
                                <RegisterPage />
                            </AuthGuard>
                        ),
                    }
                },
            },

            {
                path: routeSegments.gameSetup,
                Component: GameSetupPage,
            },
            {
                path: `${routeSegments.lobby}/:roomId`,
                Component: MatchRoomPage,
            },
            {
                path: routeSegments.dictionaries,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const { MyDictionariesPage } =
                                await import('@/pages/my-dictionaries')
                            return { Component: MyDictionariesPage }
                        },
                    },

                    {
                        path: routeSegments.add,
                        lazy: async () => {
                            const { AddDictionaryPage } =
                                await import('@/pages/add-dictionary')
                            return { Component: AddDictionaryPage }
                        },
                    },
                ],
            },
        ],
    },
])
