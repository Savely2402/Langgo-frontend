import { useBlocker } from 'react-router'

export const useNavigationBlocker = (shouldBlock: boolean) => {
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            shouldBlock && currentLocation !== nextLocation,
    )

    return {
        isBlocked: blocker.state === 'blocked',
        proceed: () => blocker.proceed?.(),
        cancel: () => blocker.reset?.(),
    }
}
