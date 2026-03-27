export const routeSegments = {
    login: 'login',
    gameSetup: 'game-setup',
    lobby: 'lobby',
    notFound: '*',
} as const

export const routes = {
    home: '/',
    login: `/${routeSegments.login}`,
    customGame: {
        root: `/${routeSegments.gameSetup}`,
        lobby: `/${routeSegments.gameSetup}/${routeSegments.lobby}`,
    },
    notFound: '*',
} as const

export type Route = (typeof routes)[keyof typeof routes]
