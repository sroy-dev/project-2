import { AuthEnum } from '@/enums/authEnums'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import {removeToken, removeUser} from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: async (headers) => {
        const accessToken = localStorage.getItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY)
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }
        headers.set('Accept', 'application/json')
        return headers
    },
})

export const baseApi = createApi({
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions)

        if (result?.error?.status === 401) {
            // api.dispatch(removeUser())
            // api.dispatch(removeToken())
        }
        return result
    },
    tagTypes: [],
    endpoints: () => ({}),
})

export default baseApi.reducer
