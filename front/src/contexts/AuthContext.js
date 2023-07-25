import {createContext, useState} from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState({
        login: localStorage.login,
        token: localStorage.token
    });

    const signIn = async (user, cb) => {
        let {login, password} = user;
        
        let res = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        if(res.ok){
            let {token} = await res.json();
            setUser({login, token});
            localStorage.login = login;
            localStorage.token = token;
            cb();
            return true;
        }
        console.log('Ошибка авторизации')
        return false;
    }
    const signOut = async (cb) => {
        setUser({login: '', token: ''});
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}