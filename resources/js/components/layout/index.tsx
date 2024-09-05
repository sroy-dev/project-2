import { FC } from "react";
import { Outlet } from "react-router-dom";

const AppLayout: FC = () => {
    return (
        <div>
            <header>
                <h1>Header</h1>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <h1>Footer</h1>
            </footer>
        </div>
    );
}

export default AppLayout;