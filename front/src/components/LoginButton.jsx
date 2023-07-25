import React from 'react';
import styles from '../styles/LoginButton.module.css'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
function LoginButton() {
    let {user} = useAuth();
    let navigate = useNavigate();
    return (
        <motion.div 
            className={styles.container} 
            onClick={() => {navigate('/login');}}
            whileHover={{
                color: 'rgb(255, 255, 255)',
                scale: 1.1,
            }}
        >
            {user.login}
        </motion.div>
    );
}

export default LoginButton;