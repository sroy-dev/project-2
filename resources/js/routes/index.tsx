import BaseApp from '@/modules/app/components/BaseApp'
import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import appRoutes from './AppRoutes'
import authRoutes from './AuthRoutes'
import errorRoutes from './ErrorRoutes'

const router = createBrowserRouter([
    {
        element: <BaseApp />,
        children: [...authRoutes, ...appRoutes, ...errorRoutes],
    },
])

const Routes: FC = () => {
    return <RouterProvider router={router} />
}

export default Routes
