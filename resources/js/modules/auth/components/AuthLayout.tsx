import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {}

const AuthLayout: FC<AuthLayoutProps> = ({}) => {
    return (
        <div className='min-h-screen flex items-center justify-center bg-white'>
            <div className='max-w-[400px] w-full px-6 py-8 my-6'>
                <img src='/img/logo.svg' alt='logo' className='h-6 mx-auto mb-5' />
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
