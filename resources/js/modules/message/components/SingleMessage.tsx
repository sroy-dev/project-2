import { FC } from 'react'

interface SingleMessageProps {
    message: {
        id: number
        user: {
            id: number
            name: string
            avatar: string
        }
        message: string
        createdAt: string
    }
}

const SingleMessage: FC<SingleMessageProps> = ({ message }) => {
    return (
        <div key={message.id}>
            <div>
                <img src={message.user.avatar} alt={message.user.name} />
                <span>{message.user.name}</span>
            </div>
            <div>
                <p>{message.message}</p>
                <span>{message.createdAt}</span>
            </div>
        </div>
    )
}

export default SingleMessage
