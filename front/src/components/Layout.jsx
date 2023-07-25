import React from 'react';
import MainMenu from './MainMenu';
import { Outlet } from 'react-router-dom';
import RequireAuth from '../hoc/RequireAuth';
import LoginButton from './LoginButton';
function Layout() {
    return (
        <RequireAuth>
            <MainMenu/>
            <LoginButton/>
            <main>
                <Outlet/>
            </main>
        </RequireAuth>
    );
}

export default Layout;