import { FC } from 'react'
import SingleMessage from '../components/SingleMessage'

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
]

const Messages: FC = () => {
    return (
        <div className='h-screen flex flex-col'>
            <div className='head'>head</div>
            <div className='grow overflow-y-auto scrollbar flex flex-col-reverse'>
                {messages.map((message) => (
                    <SingleMessage key={message.id} message={message} />
                ))}
            </div>
            <div>input</div>
        </div>
    )
}

export default Messages
