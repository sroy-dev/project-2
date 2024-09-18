import { removeToken, removeUser } from '@/store/slices/authSlice'
import { FC, useState } from 'react'
import { GoHome } from 'react-icons/go'
import { useDispatch } from 'react-redux'

const LeftBar: FC = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeUser())
        dispatch(removeToken())
    }
    return (
        <div className='border-r border-slate-700/50 w-[70px] flex items-center flex-col p-4 gap-3'>
            <img src='/img/logo-icon.svg' className='bg-slate-200 p-1 rounded-md mb-2' />
            <button className='h-[36px] w-full flex items-center justify-center bg-slate-50/10 rounded-md'>
                <GoHome />
            </button>
            <div className='mt-auto relative'>
                <button type='button' onClick={() => setOpen(!open)}>
                    <div className='w-[34px] h-[34px] rounded-lg bg-white/30 flex items-center justify-center'>
                        J
                    </div>
                </button>
                {open && (
                    <div className='absolute bg-slate-900 px-2 py-5 left-full bottom-0 rounded w-[200px] z-10'>
                        <button
                            className='w-full py-2 px-3 text-left text-white/80 hover:bg-slate-800 rounded-md'
                            type='button'
                        >
                            Profile Settings
                        </button>
                        <button
                            className='w-full py-2 px-3 text-left text-white/80 hover:bg-slate-800 rounded-md'
                            type='button'
                        >
                            Team Settings
                        </button>
                        <button
                            className='w-full py-2 px-3 text-left text-white/80 hover:bg-slate-800 rounded-md'
                            type='button'
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeftBar
