import { ErrorRoutesEnum } from '@/enums/routeEnums'
import { BaseState } from '@/store'
import { useLazyGetMessagesQuery, useSendMessageMutation } from '@/store/apis/conversationApi'
import { FC, useEffect, useState } from 'react'
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
                console.log('Messages fetched', data)
                setMessages(data.data.data)
            })
            .catch((error) => {
                if (error.status === 404) {
                    console.log('No messages found')
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
