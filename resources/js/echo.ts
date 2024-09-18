import Echo from 'laravel-echo'

import Pusher from 'pusher-js'
import { AuthEnum } from './enums/authEnums'
window.Pusher = Pusher

declare global {
    interface Window {
        Pusher: any
        Echo: any
    }
}

window.Echo = new Echo({
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY),
            'X-CSRF-Token': 'CSRF_TOKEN',
        },
    },
    // authEndpoint: '/broadcasting/auth',
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    wsHost:
        import.meta.env.VITE_PUSHER_HOST ??
        `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})
