import { Provider as StoreProvider } from 'react-redux'
import { store } from './store'

type Props = {
    children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
    return <StoreProvider store={store}>{children}</StoreProvider>
}
