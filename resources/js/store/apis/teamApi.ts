import { baseApi } from '.'
import { addMember } from '../slices/authSlice'

const teamApi = baseApi.enhanceEndpoints({ addTagTypes: ['Team'] }).injectEndpoints({
    endpoints: (builder) => ({
        createMember: builder.mutation({
            query: (member) => ({
                url: '/team-members',
                method: 'POST',
                body: member,
            }),
            invalidatesTags: ['Team'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                queryFulfilled.then(({ data }) => {
                    dispatch(addMember(data.data))
                })
            },
        }),
    }),
})

export const { useCreateMemberMutation } = teamApi
