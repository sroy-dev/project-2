import { AppRoutesEnum } from '@/enums/routeEnums'
import DashboardLayout from '@/modules/app/components/DashboardLayout'
import ChannelMessages from '@/modules/message/page/ChannelMessages'
import DirectMessages from '@/modules/message/page/DirectMessages'
import { RouteObject } from 'react-router-dom'

const appRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <></>,
            },
            {
                path: AppRoutesEnum.CHANNEL_MESSAGES,
                element: <ChannelMessages />,
            },
            {
                path: AppRoutesEnum.DIRECT_MESSAGES,
                element: <DirectMessages />,
            },
        ],
    },
]

export default appRoutes
