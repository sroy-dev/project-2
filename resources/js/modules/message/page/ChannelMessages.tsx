import { FC, useState } from 'react'
import ChannelBar from '../components/ChannelBar'
import MessageInput from '../components/MessageInput'
import SingleMessage from '../components/SingleMessage'

const msg = [
    {
        id: 1,
        user: {
            id: 1,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'Hello, how are you?',
        createdAt: '2021-09-01 12:00:00',
    },
    {
        id: 2,
        user: {
            id: 2,
            name: 'Jane Doe',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'I am fine, thank you.',
        createdAt: '2021-09-01 12:01:00',
    },
    {
        id: 3,
        user: {
            id: 1,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'That is great to hear.',
        createdAt: '2021-09-01 12:02:00',
    },
].reverse()

const ChannelMessages: FC = () => {
    const [messages, setMessages] = useState(msg)

    return (
        <div className='h-screen flex flex-col'>
            <ChannelBar />
            <div className='h-[calc(100vh-124px)] grow overflow-y-auto scrollbar flex flex-col-reverse'>
                {messages.map((message) => (
                    <SingleMessage key={message.id} message={message} />
                ))}
            </div>
            <MessageInput
                onEnter={(message) => {
                    setMessages([
                        {
                            id: messages.length + 1,
                            user: {
                                id: 1,
                                name: 'John Doe',
                                avatar: 'https://randomuser.me/api/portraits',
                            },
                            message,
                            createdAt: new Date().toISOString(),
                        },
                        ...messages,
                    ])
                }}
            />
        </div>
    )
}

export default ChannelMessages
