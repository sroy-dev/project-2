import { ErrorRoutesEnum } from '@/enums/routeEnums'
import { Navigate, RouteObject } from 'react-router-dom'

const errorRoutes: RouteObject[] = [
    {
        path: ErrorRoutesEnum.NOT_FOUND,
        element: <div className='h-screen flex items-center justify-center text-4xl'>404</div>,
    },
    {
        path: '/*',
        element: <Navigate to={ErrorRoutesEnum.NOT_FOUND} replace />,
    },
]

export default errorRoutes
