import AppLayout from "@/components/layout";
import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <h1>Hello, world!</h1>,
            },
            {
                path: "/about",
                element: <h1>About</h1>,
            }
        ]
    }
]);

const AppRoutes:FC = () => {
    return <RouterProvider router={router} />;
}

export default AppRoutes;