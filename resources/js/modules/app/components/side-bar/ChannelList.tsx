import { FC, useRef } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import ChannelAddModal from './ChannelAddModal'

interface ChannelListProps {
    className?: string
    channels: any[]
}

const ChannelList: FC<ChannelListProps> = ({ className, channels }) => {
    const channelAddModalRef = useRef<any>(null)
    const navigate = useNavigate()

    const handleChannelClick = (channelId: string) => {
        navigate(`/channel/${channelId}`)
    }

    return (
        <div className='mb-7'>
            <div className='flex justify-between px-4 mb-3'>
                <div className='text-sm font-semibold text-slate-600'>Channels</div>
                <button onClick={() => channelAddModalRef.current?.open()}>
                    <GoPlusCircle />
                </button>

                <ChannelAddModal ref={channelAddModalRef} />
            </div>
            {
                // channels
                channels.map((channel, i) => (
                    <div
                        key={i}
                        className='flex justify-between px-4 py-2 hover:bg-slate-700/10 text-slate-400 cursor-pointer'
                        onClick={() => handleChannelClick(channel.id)}
                    >
                        <div className='text-sm'># {channel.channel_name}</div>
                        {/* <div className='text-xs text-slate-400'>(10)</div> */}
                    </div>
                ))
            }
        </div>
    )
}

export default ChannelList
