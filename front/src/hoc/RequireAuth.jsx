import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

function RequireAuth({children}) {
    let {user} = useAuth();
    if(!user.token){
        return <Navigate to='/login'/>
    }
    return (
        <>
            {children}
        </>
    );
}

export default RequireAuth;