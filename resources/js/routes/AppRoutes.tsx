import { AppRoutesEnum } from '@/enums/routeEnums'
import DashboardLayout from '@/modules/app/components/DashboardLayout'
import { RouteObject } from 'react-router-dom'

const appRoutes: RouteObject[] = [
    {
        element: <DashboardLayout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <>Dashboard</>,
            },
        ],
    },
]

export default appRoutes
