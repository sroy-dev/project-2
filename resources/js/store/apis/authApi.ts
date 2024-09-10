import { baseApi } from '.'
import { setToken, setUser } from '../slices/authSlice'

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
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
