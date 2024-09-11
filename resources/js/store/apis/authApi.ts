import { Response } from '@/types/response'
import { baseApi } from '.'
import { removeToken, removeUser, setToken, setUser } from '../slices/authSlice'

const authApi = baseApi.enhanceEndpoints({ addTagTypes: ['Auth'] }).injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    queryFulfilled.then(({ data }) => {
                        dispatch(setUser(data.data.user))
                        dispatch(setToken(data.data.token))
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    queryFulfilled.then(({ data }) => {
                        dispatch(setUser(data.data.user))
                        dispatch(setToken(data.data.token))
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        logout: builder.mutation<Response<null>, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    queryFulfilled.then(() => {
                        dispatch(removeUser())
                        dispatch(removeToken())
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        me: builder.query<Response<null>, void>({
            query: () => ({
                url: '/auth/me',
                method: 'GET',
            }),
            providesTags: ['Auth'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    queryFulfilled.then(({ data }) => {
                        dispatch(setUser(data.data))
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useLazyMeQuery } = authApi
