import { toast } from '@/utils/toastUtils'
import type { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

// import {setNotification} from 'store/features/app/appSlice'

export const errorMiddleware: Middleware = (api: any) => (next: any) => (action: any) => {
    if (isRejectedWithValue(action)) {
        const message = action.payload?.data?.message || 'Something went wrong!'
        if (action.payload?.status !== 404) toast({ message, type: 'error' })
    }

    return next(action)
}
