import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;