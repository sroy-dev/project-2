import {MenuItem} from '@/types/menu'
import {FC, useEffect, useState} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'

interface Props {
    className?: string
    item: MenuItem
}

const MenuItem: FC<Props> = ({className, item}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        if (item.subMenu && item.subMenu.findIndex((item) => pathname.includes(item.path)) > -1) {
            setDropdownOpen(true)
        }
    }, [item.subMenu, pathname])

    return (
        <li>
            {item.subMenu ? (
                <Link
                    to='#'
                    className={`text-[13px] tracking-tight flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 hover:text-primary focus:no-underline has-arrow text-slate-500`}
                >
                    {item.icon && <item.icon className='text-[16px] opacity-50 w-[20px]' />}
                    <span className='font-medium'>{item.name}</span>
                </Link>
            ) : (
                <NavLink
                    to={item.path}
                    className={({isActive}) =>
                        `${className} text-[13px] tracking-tight flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 hover:text-primary focus:no-underline ${
                            isActive ? 'text-primary' : 'text-slate-500'
                        }`
                    }
                >
                    {item.icon && <item.icon className='text-[16px] opacity-50 w-[20px]' />}
                    <span className='font-medium'>{item.name}</span>
                </NavLink>
            )}

            {item.subMenu && (
                <ul className={`ml-8 ${dropdownOpen ? 'mm-show' : 'mm-collapse'}`}>
                    {item.subMenu.map((item, index) => {
                        return <MenuItem key={index} item={item} className='mb-1' />
                    })}
                </ul>
            )}
        </li>
    )
}

export default MenuItem
