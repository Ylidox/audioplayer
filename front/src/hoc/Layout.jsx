import React from 'react';
import MainMenu from '../components/MainMenu';
import { Outlet } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginButton from '../components/LoginButton';
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