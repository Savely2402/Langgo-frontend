import { Provider as StoreProvider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { store } from './providers/store/store'
import { router } from './router/AppRouter'

export const AppProviders = () => {
    return (
        <StoreProvider store={store}>
            <RouterProvider router={router} />
        </StoreProvider>
    )
}
