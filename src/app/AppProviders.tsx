import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'

type Props = {
    children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>
}
