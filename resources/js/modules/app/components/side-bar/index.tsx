import sidebarMenuConfig from '@/configs/sidebarMenuConfig'
import {MenuItem as MenuItemType} from '@/types/menu'
import MetisMenu from '@metismenu/react'
import 'metismenujs/sass'
import {FC} from 'react'
import MenuItem from './MenuItem'

const SideBar: FC = () => {
    return (
        <div className='bg-white h-screen fixed z-20 left-0 top-0 bottom-0 w-[260px] border-r '>
            <div className='h-screen overflow-y-auto scrollbar thin-scrollbar'>
                <div className='px-5 py-[20px] relative'>
                    {/* <img className='h-[24px] relative' src={`/logo-dark.svg`} alt='' /> */}
                    <span className='font-bold'>Ches Cafe</span>
                </div>
                <div className='px-4 py-4 min-h-[calc(100vh-70px)]'>
                    <MetisMenu>
                        {sidebarMenuConfig.map((item: any, index: number) => {
                            if (item.type === 'title') {
                                return (
                                    <div
                                        className='px-4 mt-5 mb-2 text-[11px] text-slate-400 uppercase font-medium tracking-widest'
                                        key={index}
                                    >
                                        {item.name}
                                    </div>
                                )
                            } else return <MenuItem key={index} item={item as MenuItemType} />
                        })}
                    </MetisMenu>
                </div>
            </div>
        </div>
    )
}
export default SideBar
