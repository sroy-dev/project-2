import { FC } from 'react'
import { GoGear, GoPencil, GoPlusCircle } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InviteButton from './InviteButton'

const channels = ['General', 'Random', 'Development', 'Design', 'Marketing']

const RightBar: FC = () => {
    const { user, members, team } = useSelector((state: any) => state.auth)

    const navigate = useNavigate()

    const handleChannelClick = (channelId: string) => {
        navigate(`/channel/${channelId}`)
    }
    const handleDirectMessageClick = (userId: string) => {
        navigate(`/direct/${userId}`)
    }

    return (
        <div className='grow flex flex-col'>
            <div className='flex gap-2 justify-between px-4 py-4'>
                <div className=''>{team?.name}</div>
                <button>
                    <GoGear />
                </button>
            </div>
            <div className='border-b border-slate-700/50 flex justify-between gap-2 mb-7 pb-3 px-4'>
                <div className='flex gap-2 items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-slate-700 flex items-center justify-center'>
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <div className='text-sm font-semibold'>{user?.name}</div>
                        <div className='text-xs text-slate-500'>{user?.email}</div>
                    </div>
                </div>
                <button>
                    <GoPencil />
                </button>
            </div>

            <div className='mb-7'>
                <div className='flex justify-between px-4 mb-3'>
                    <div className='text-sm font-semibold text-slate-600'>Channels</div>
                    <button>
                        <GoPlusCircle />
                    </button>
                </div>
                {
                    // channels
                    channels.map((channel, i) => (
                        <div
                            key={i}
                            className='flex justify-between px-4 py-2 hover:bg-slate-700/10 text-slate-400 cursor-pointer'
                            onClick={() => handleChannelClick(channel)}
                        >
                            <div className='text-sm'># {channel}</div>
                            {/* <div className='text-xs text-slate-400'>(10)</div> */}
                        </div>
                    ))
                }
            </div>
            <div>
                <div className='flex justify-between px-4 mb-3'>
                    <div className='text-sm font-semibold text-slate-600'>Direct Messages</div>
                    {/* <button>
                        <GoPlusCircle />
                    </button> */}
                </div>
                {
                    // members
                    members.map((member: any, i: number) => (
                        <div
                            key={i}
                            className='flex justify-between px-4 py-2 hover:bg-slate-700/10 text-slate-400 cursor-pointer'
                            onClick={() => handleDirectMessageClick(member.id)}
                        >
                            <div className='flex gap-2 items-center'>
                                <div className='w-[30px] h-[30px] rounded-full bg-white/30 flex items-center justify-center'>
                                    {member?.name?.charAt(0)}
                                </div>
                                <div className='text-sm'>{member?.name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='p-4 mt-auto flex justify-center'>
                <InviteButton />
            </div>
        </div>
    )
}

export default RightBar
