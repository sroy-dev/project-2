import { FC } from 'react'

const ChannelBar: FC = () => {
    return (
        <div className='py-4 px-6 border-b border-slate-700/50 shadow-sm h-[64px]'>
            <div className='flex items-center gap-3'>
                <div className='w-[30px] h-[30px] rounded-lg bg-white/30 flex items-center justify-center'>
                    C
                </div>
                <div>Channel Name</div>
            </div>
        </div>
    )
}

export default ChannelBar
