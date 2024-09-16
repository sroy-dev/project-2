import { humanizeDate } from '@/utils/dateUtils'
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
        created_at: string
    }
}

const SingleMessage: FC<SingleMessageProps> = ({ message }) => {
    return (
        <div className={`py-4 px-6 flex gap-2`} key={message.id}>
            <div className='w-[30px] h-[30px] rounded-lg bg-white/30 flex items-center justify-center'>
                {message.user.name[0]}
            </div>
            <div>
                <div className='flex gap-2 mb-2 leading-[1]'>
                    <span className='font-semibold'>{message.user.name}</span>
                    <span className='text-xs leading-[1] opacity-70'>
                        {humanizeDate(message.created_at)}
                    </span>
                </div>
                <p>{message.message}</p>
            </div>
        </div>
    )
}

export default SingleMessage
