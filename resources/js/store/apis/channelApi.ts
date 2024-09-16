import { baseApi } from '.'
import { addChannel } from '../slices/authSlice'

const channelApi = baseApi.enhanceEndpoints({ addTagTypes: ['Channel'] }).injectEndpoints({
    endpoints: (builder) => ({
        createChannel: builder.mutation({
            query: (channel) => ({
                url: '/channels',
                method: 'POST',
                body: channel,
            }),
            invalidatesTags: ['Channel'],
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                queryFulfilled.then(({ data }) => {
                    dispatch(addChannel(data.data))
                })
            },
        }),
    }),
})

export const { useCreateChannelMutation } = channelApi
