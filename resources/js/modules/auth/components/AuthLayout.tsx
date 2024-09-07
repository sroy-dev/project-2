import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AuthLayoutProps {}

const AuthLayout: FC<AuthLayoutProps> = ({}) => {
    return (
        <div className='min-h-screen flex items-start justify-center bg-white'>
            <div className='max-w-[400px] w-full px-6 py-8 mt-12'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
