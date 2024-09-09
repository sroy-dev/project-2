import { FC } from 'react'
import LeftBar from './Left'
import RightBar from './Right'

const SideBar: FC = () => {
    return (
        <div className='bg-[#151521] text-slate-300 h-screen fixed z-20 left-0 top-0 bottom-0 w-[360px] border-r border-[#2A2B30] flex'>
            <LeftBar />
            <RightBar />
        </div>
    )
}
export default SideBar
