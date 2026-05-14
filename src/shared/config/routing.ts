export const routeSegments = {
    login: 'login',
    register: 'register',
    gameSetup: 'game-setup',
    lobby: 'lobby',
    dictionaries: 'dictionaries',
    notFound: '*',
} as const

export const routes = {
    home: '/',
    login: `/${routeSegments.login}`,
    register: `/${routeSegments.register}`,
    gameSetup: `/${routeSegments.gameSetup}`,
    lobby: `/${routeSegments.lobby}`,
    dictionaries: `/${routeSegments.dictionaries}`,
    notFound: '*',
} as const

export type Route = (typeof routes)[keyof typeof routes]
