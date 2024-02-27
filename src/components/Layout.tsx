import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <main>
                { children }
            </main>
        </>
    )
}

export default Layout;