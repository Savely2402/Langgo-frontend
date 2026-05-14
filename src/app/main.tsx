import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from './AppProviders.tsx'
import './index.css'

async function initApp() {
    // Move @mswjs worker to lazy import
    // const { worker } = await import('@/app/apiMockWorker')
    // await worker.start()
}

initApp().then(() =>
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <AppProviders />
        </StrictMode>,
    ),
)
