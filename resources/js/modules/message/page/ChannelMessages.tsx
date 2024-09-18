import { ErrorRoutesEnum } from '@/enums/routeEnums'
import { BaseState } from '@/store'
import {
    useLazyGetChannelMessagesQuery,
    useSendChannelMessageMutation,
} from '@/store/apis/channelApi'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import ChannelBar from '../components/ChannelBar'
import MessageInput from '../components/MessageInput'
import SingleMessage from '../components/SingleMessage'

const ChannelMessages: FC = () => {
    const [page, setPage] = useState(1)
    const [messages, setMessages] = useState<any>([])
    const { channels } = useSelector((state: BaseState) => state.auth)
    const { channelId } = useParams()

    const [sendMessage] = useSendChannelMessageMutation()
    const [getMessages] = useLazyGetChannelMessagesQuery()

    const channel = channels.find((member: any) => member.id === Number(channelId))
    if (!channel) return <Navigate to={ErrorRoutesEnum.NOT_FOUND} />

    const handleSendMessage = async (message: string) => {
        sendMessage({ id: channel.id, body: { message: message } })
            .unwrap()
            .then((data) => {
                setMessages([data.data, ...messages])
            })
    }

    const fetchMessages = () => {
        getMessages(channelId)
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
    }, [channelId])

    return (
        <div className='h-screen flex flex-col'>
            <ChannelBar />
            <div className='h-[calc(100vh-124px)] grow overflow-y-auto scrollbar flex flex-col-reverse'>
                {messages.map((message: any) => (
                    <SingleMessage key={message.id} message={message} />
                ))}
            </div>
            <MessageInput onEnter={handleSendMessage} />
        </div>
    )
}

export default ChannelMessages
