import { FC } from 'react'
import { GoGear, GoPencil, GoPlusCircle } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const channels = ['General', 'Random', 'Development', 'Design', 'Marketing']
const members = [
    'John Doe',
    'Mary Smith',
    'Alex Johnson',
    'Linda Brown',
    'David White',
    'Emma Black',
    'James Green',
]

const RightBar: FC = () => {
    const navigate = useNavigate()

    const handleChannelClick = (channelId: string) => {
        navigate(`/channel/${channelId}`)
    }
    const handleDirectMessageClick = (userId: string) => {
        navigate(`/direct/${userId}`)
    }

    return (
        <div className='grow'>
            <div className='flex gap-2 justify-between px-4 py-4'>
                <div className=''>Team Sync</div>
                <button>
                    <GoGear />
                </button>
            </div>
            <div className='border-b border-slate-700/50 flex justify-between gap-2 mb-7 pb-3 px-4'>
                <div className='flex gap-2 items-center'>
                    <div className='w-[40px] h-[40px] rounded-full bg-slate-700 flex items-center justify-center'>
                        JD
                    </div>
                    <div>
                        <div className='text-sm font-semibold'>John Doe</div>
                        <div className='text-xs text-slate-500'>Admin</div>
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
                    <button>
                        <GoPlusCircle />
                    </button>
                </div>
                {
                    // members
                    members.map((member, i) => (
                        <div
                            key={i}
                            className='flex justify-between px-4 py-2 hover:bg-slate-700/10 text-slate-400 cursor-pointer'
                            onClick={() => handleDirectMessageClick(member)}
                        >
                            <div className='flex gap-2 items-center'>
                                <div className='w-[30px] h-[30px] rounded-full bg-white/30 flex items-center justify-center'>
                                    {member[0]}
                                </div>
                                <div className='text-sm'>{member}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RightBar
