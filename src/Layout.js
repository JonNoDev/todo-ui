import { Outlet } from 'react-router-dom';
import Navbar from './components/ui/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;