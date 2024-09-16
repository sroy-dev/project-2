import { FC } from 'react'

interface UserBarProps {
    user: {
        id: number
        name: string
        avatar: string
    }
}

const UserBar: FC<UserBarProps> = ({ user }) => {
    return (
        <div className='py-4 px-6 border-b border-slate-700/50 shadow-sm h-[64px]'>
            <div className='flex items-center gap-3'>
                <div className='w-[30px] h-[30px] rounded-lg bg-white/30 flex items-center justify-center'>
                    {user.name[0]}
                </div>
                <div>{user.name}</div>
            </div>
        </div>
    )
}

export default UserBar
