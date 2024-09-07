import {FC} from 'react'
import UserDropdown from './UserDropdown'

const TopBar: FC = () => {
    return (
        <div className='h-[60px] fixed top-0 right-0 w-[calc(100%-260px)] bg-white border-b shadow-slate-100 px-5 flex items-center z-[20]'>
            <div className='grow max-w-[800px] relative'>Top bar</div>
            <UserDropdown className='ml-auto' />
        </div>
    )
}

export default TopBar
