import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './side-bar'

const DashboardLayout: FC = () => {
    return (
        <div className='text-[14px] min-h-screen bg-[#1d1d2b] pl-[360px] text-slate-400 flex flex-col'>
            <SideBar />
            <div className='grow'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout
