import { baseApi } from '.'

const conversationApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Conversation'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMessages: builder.query({
                query: (id) => `/direct-messages/${id}`,
                providesTags: ['Conversation'],
            }),
            sendMessage: builder.mutation({
                query: ({ id, body }) => ({
                    url: `/direct-messages/${id}`,
                    method: 'POST',
                    body,
                }),
                invalidatesTags: ['Conversation'],
            }),
            getNewMessages: builder.query({
                query: ({ id, last_message_id }) =>
                    `/direct-messages/${id}/new?last_message_id=${last_message_id}`,
                providesTags: ['Conversation'],
            }),
        }),
    })

export const { useLazyGetMessagesQuery, useSendMessageMutation, useLazyGetNewMessagesQuery } =
    conversationApi
