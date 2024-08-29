import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PopContextProvider from './Context/PopContextProvider'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SeedPage from './Pages/SeedPage/SeedPage.tsx'
import KeysContextProvider from './Context/KeysContextProvider.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<App />} />
            <Route path='/seed' element={<SeedPage />} />
        </>
    )
)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PopContextProvider>
            <KeysContextProvider>
            <RouterProvider router={router} />
            </KeysContextProvider>
        </PopContextProvider>
    </StrictMode>
)
