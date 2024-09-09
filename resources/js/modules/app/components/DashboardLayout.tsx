import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './side-bar'

const DashboardLayout: FC = () => {
    return (
        <div className='text-[14px] min-h-screen bg-[#181B1E] pl-[260px] pt-[60px]  flex flex-col'>
            <SideBar />
            {/* <TopBar /> */}
            <div className=' grow p-5'>
                <Outlet />
            </div>
            <div className='p-4 flex justify-center text-sm opacity-60'>
                &copy; {new Date().getFullYear()}. All rights reserved by Team Sync
            </div>
        </div>
    )
}

export default DashboardLayout
