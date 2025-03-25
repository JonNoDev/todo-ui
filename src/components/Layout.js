import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './ui/Navbar';

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