import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { router } from './router/AppRouter'
import { store } from './store'

export const AppProviders = () => {
    return (
        <StoreProvider store={store}>
            <RouterProvider router={router} />
        </StoreProvider>
    )
}
