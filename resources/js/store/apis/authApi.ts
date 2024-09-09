import { baseApi } from '.'
import { setToken, setUser } from '../slices/authSlice'

const authApi = baseApi.enhanceEndpoints({ addTagTypes: ['Auth'] }).injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    queryFulfilled.then(({ data }) => {
                        dispatch(
                            setUser({
                                id: data.data.id,
                                phone: data.data.phone,
                                name: data.data.name,
                            })
                        )
                        dispatch(setToken(data.data.accessToken))
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

export const { useAdminLoginMutation, useLogoutMutation } = authApi
