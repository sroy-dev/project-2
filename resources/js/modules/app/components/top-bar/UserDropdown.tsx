import { Button } from '@/components/button'
import { Dropdown } from '@/components/dropdown'
import { AppRoutesEnum } from '@/enums/routeEnums'
import { removeToken, removeUser } from '@/store/slices/authSlice'
import { FC } from 'react'
import { BiLogOut, BiUser } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

interface UserDropdownProps {
    className?: string
}

const UserDropdown: FC<UserDropdownProps> = ({ className }) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(removeToken())
        dispatch(removeUser())
    }

    return (
        <Dropdown
            className={`self-stretch ${className}`}
            position='bottom-right'
            toggleWrapperClassName='h-full flex items-center'
            renderToggle={
                <div className='h-[40px] w-[40px] bg-gray-200 rounded-full flex items-center justify-center'>
                    sf
                </div>
            }
        >
            <div className='p-3 w-[200px]'>
                <ul>
                    <li>
                        <Link
                            className='px-2 py-1 flex items-center gap-2'
                            to={AppRoutesEnum.PROFILE}
                        >
                            <BiUser className='opacity-50' />
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='px-2 py-1 flex items-center gap-2'
                            to={AppRoutesEnum.PROFILE}
                        >
                            <BiUser className='opacity-50' />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='px-2 py-1 flex items-center gap-2'
                            to={AppRoutesEnum.PROFILE}
                        >
                            <BiUser className='opacity-50' />
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Button
                            variant='transparent'
                            className='border-0 !px-2 py-1 h-auto flex items-center gap-2'
                            onClick={handleLogout}
                        >
                            <BiLogOut className='opacity-50' />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </Dropdown>
    )
}

export default UserDropdown
