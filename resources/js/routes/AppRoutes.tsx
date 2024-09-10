import { AppRoutesEnum } from '@/enums/routeEnums'
import DashboardLayout from '@/modules/app/components/DashboardLayout'
import Messages from '@/modules/message/page/Messages'
import { RouteObject } from 'react-router-dom'

const appRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <>Dashboard</>,
            },
            {
                path: AppRoutesEnum.CHANNEL_MESSAGES,
                element: <>Channel Messages</>,
            },
            {
                path: AppRoutesEnum.DIRECT_MESSAGES,
                element: <Messages />,
            },
        ],
    },
]

export default appRoutes
