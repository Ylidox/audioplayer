import React from 'react';
import MainMenu from '../components/MainMenu';
import { Outlet } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginButton from '../components/LoginButton';
import { SideControlUnit } from '../components/SideControlUnit';
function Layout() {
    return (
        <RequireAuth>
            <MainMenu/>
            <LoginButton/>
            <main>
                <Outlet/>
                <SideControlUnit/>
            </main>
        </RequireAuth>
    );
}

export default Layout;