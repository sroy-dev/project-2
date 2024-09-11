import { FC } from 'react'
import { GoHome } from 'react-icons/go'

const LeftBar: FC = () => {
    return (
        <div className='border-r border-slate-700/50 w-[70px] flex items-center flex-col p-4 gap-3'>
            <img src='/img/logo-icon.svg' className='bg-slate-200 p-1 rounded-md mb-2' />
            <button className='h-[36px] w-full flex items-center justify-center bg-slate-50/10 rounded-md'>
                <GoHome />
            </button>
            <div className='mt-auto'>
                <button>
                    <div className='w-[34px] h-[34px] rounded-lg bg-white/30 flex items-center justify-center'>
                        J
                    </div>
                </button>
            </div>
        </div>
    )
}

export default LeftBar
