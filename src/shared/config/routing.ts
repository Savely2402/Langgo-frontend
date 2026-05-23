export const routeSegments = {
    login: 'login',
    register: 'register',
    gameSetup: 'game-setup',
    lobby: 'lobby',
    dictionaries: 'dictionaries',
    add: 'add',
    edit: 'edit',
    notFound: '*',
} as const

export const routes = {
    home: '/',
    login: `/${routeSegments.login}`,
    register: `/${routeSegments.register}`,
    gameSetup: `/${routeSegments.gameSetup}`,
    lobby: (roomId: string) => `/${routeSegments.lobby}/${roomId}`,
    dictionaries: `/${routeSegments.dictionaries}`,
    dictionaryAdd: `/${routeSegments.dictionaries}/${routeSegments.add}`,
    dictionaryEdit: (id: string) =>
        `/${routeSegments.dictionaries}/${routeSegments.edit}/${id}`,
    notFound: '*',
} as const

export type Route = (typeof routes)[keyof typeof routes]
