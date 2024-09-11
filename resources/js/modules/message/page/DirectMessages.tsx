import { FC } from 'react'
import MessageInput from '../components/MessageInput'
import SingleMessage from '../components/SingleMessage'
import UserBar from '../components/UserBar'

const messages = [
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
    {
        id: 4,
        user: {
            id: 2,
            name: 'Jane Doe',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'Yes, it is.',
        createdAt: '2021-09-01 12:03:00',
    },
    {
        id: 5,
        user: {
            id: 1,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'I have to go now.',
        createdAt: '2021-09-01 12:04:00',
    },
    {
        id: 6,
        user: {
            id: 3,
            name: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'Hello, how are you?',
        createdAt: '2021-09-01 12:05:00',
    },
    {
        id: 7,
        user: {
            id: 4,
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'I am fine, thank you.',
        createdAt: '2021-09-01 12:06:00',
    },
    {
        id: 8,
        user: {
            id: 3,
            name: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'That is great to hear.',
        createdAt: '2021-09-01 12:07:00',
    },
    {
        id: 9,
        user: {
            id: 4,
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'Yes, it is.',
        createdAt: '2021-09-01 12:08:00',
    },
    {
        id: 10,
        user: {
            id: 3,
            name: 'John Smith',
            avatar: 'https://randomuser.me/api/portraits',
        },
        message: 'I have to go now.',
        createdAt: '2021-09-01 12:09:00',
    },
].reverse()

const DirectMessages: FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <UserBar />
            <div className='h-[calc(100vh-124px)] grow overflow-y-auto scrollbar flex flex-col-reverse'>
                {messages.map((message) => (
                    <SingleMessage key={message.id} message={message} />
                ))}
            </div>
            <MessageInput />
        </div>
    )
}

export default DirectMessages
