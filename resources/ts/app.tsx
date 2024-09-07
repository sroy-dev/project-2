import Routes from '@/routes'
import { store } from '@/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Routes />
            <Toaster richColors />
        </Provider>
    </React.StrictMode>
)
