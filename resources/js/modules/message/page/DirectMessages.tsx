import { ErrorRoutesEnum } from '@/enums/routeEnums'
import { BaseState } from '@/store'
import {
    useLazyGetMessagesQuery,
    useLazyGetNewMessagesQuery,
    useSendMessageMutation,
} from '@/store/apis/conversationApi'
import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import MessageInput from '../components/MessageInput'
import SingleMessage from '../components/SingleMessage'
import UserBar from '../components/UserBar'

const DirectMessages: FC = () => {
    const [page, setPage] = useState(1)
    const [messages, setMessages] = useState<any>([])
    const { members } = useSelector((state: BaseState) => state.auth)
    const { userId } = useParams()

    const [sendMessage] = useSendMessageMutation()
    const [getMessages] = useLazyGetMessagesQuery()
    const [getNewMessages] = useLazyGetNewMessagesQuery()

    const user = members.find((member: any) => member.id === Number(userId))
    if (!user) return <Navigate to={ErrorRoutesEnum.NOT_FOUND} />

    const handleSendMessage = async (message: string) => {
        sendMessage({ id: user.id, body: { message: message } })
            .unwrap()
            .then((data) => {
                setMessages([data.data, ...messages])
            })
    }

    const fetchMessages = () => {
        getMessages(userId)
            .unwrap()
            .then((data) => {
                // console.log('Messages fetched', data)
                setMessages(data.data.data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    // console.log('No messages found')
                    setMessages([])
                }
            })
    }

    useEffect(() => {
        fetchMessages()
    }, [userId])

    const handleScroll = (e: any) => {
        console.log('Scrolling')
        const { scrollTop, clientHeight, scrollHeight } = e.target
        if (scrollTop === 0) {
            console.log('Load More')
            setPage(page + 1)
        }
    }

    const fetchNewMessages = useCallback(() => {
        if (!messages.length) return
        console.log('Fetching new messages')
        getNewMessages({ id: user.id, last_message_id: messages[0]?.id })
            .unwrap()
            .then((data) => {
                console.log('New Messages fetched', data)
                setMessages([...data.data, ...messages])
            })
    }, [messages, user.id])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchNewMessages()
        }, 3000)

        return () => {
            clearInterval(interval)
        }

        // window.Echo.channel('chat')
        //     .listen('DirectMessageSent', (e: any) => {
        //         console.log('direct-message-sent', e)

        //         // const selectedConnection: any =
        //         //     { ...store.state.connection.selectedConnection } || null;

        //         // if (selectedConnection) {
        //         //     if (message.sender_id == selectedConnection.connected_user_id) {
        //         //         messages.value.unshift(message);
        //         //         messageContainer.value.scrollTop =
        //         //             messageContainer.value.scrollHeight;
        //         //     } else {
        //         //         console.log("another user sent message");
        //         //     }
        //         // }
        //     })
        //     .error((error: any) => {
        //         console.error('Error subscribing to channel:', error) // Log any errors
        //     })

        // return () => {
        //     window.Echo.leave('chat')
        // }
    }, [fetchNewMessages])

    return (
        <div className='h-screen flex flex-col'>
            <UserBar user={user} />
            <div
                className='h-[calc(100vh-124px)] grow overflow-y-auto scrollbar flex flex-col-reverse'
                // onScroll={handleScroll}
            >
                {messages.map((message: any) => (
                    <SingleMessage key={message.id} message={message} />
                ))}
            </div>
            <MessageInput onEnter={handleSendMessage} />
        </div>
    )
}

export default DirectMessages
