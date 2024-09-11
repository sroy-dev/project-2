import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {}

const AuthLayout: FC<AuthLayoutProps> = ({}) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#1d1d2b] text-slate-300'>
            <div className='max-w-[400px] w-full px-7 py-10 my-6 bg-slate-700/10 rounded-xl shadow-2xl'>
                <img src='/img/logo-light.svg' alt='logo' className='h-6 mx-auto mb-5' />
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
