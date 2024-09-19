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
        getChannelMessages: builder.query({
            query: (channelId) => `/channel-messages/${channelId}`,
            providesTags: ['Channel'],
        }),
        sendChannelMessage: builder.mutation({
            query: ({ id, body }) => ({
                url: `/channel-messages/${id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Channel'],
        }),
        getNewChannelMessages: builder.query({
            query: ({ id, last_message_id }) =>
                `/channel-messages/${id}/new?last_message_id=${last_message_id}`,
            providesTags: ['Channel'],
        }),
    }),
})

export const {
    useCreateChannelMutation,
    useLazyGetChannelMessagesQuery,
    useSendChannelMessageMutation,
    useLazyGetNewChannelMessagesQuery,
} = channelApi
