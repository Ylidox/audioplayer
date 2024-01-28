import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/Registration.module.css'
import { motion } from 'framer-motion';

let selected = {
    initial: {
        opacity: 0,
        outline: '0px',
        scale: 0,
    },
    top: {
        opacity: 1,
        top: '0.5vh',
        outline: '0px',
        scale: 1.1,
    },
    bottom: {
        opacity: 1,
        top: '16.3vh',
        outline: '0px',
        scale: 1.1,
    },
}

export const Registration = () => {
    let [selectInput, setSelectInput] = useState('initial');
    let [login, setLogin] = useState(''); 
    let [password, setPassword] = useState('');
    let {signIn} = useAuth();
    let navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        let res = await fetch('/user/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({login, password})
        });
        res.json()
            .then(result => {
                signIn({login, password}, () => navigate('/', {replace:true}))
            })
    }

    return (
        <>
            <div className={styles.container}>
                <motion.div className={styles.content}>
                    <motion.div 
                        className={styles.select_input}
                        variants={selected}
                        animate={selectInput}
                        transition={{ 
							type: "spring", 
							stiffness: 200,
							damping: 15, 
							duration: 0.2,
						}}
                    ></motion.div>
                    <motion.input 
                        type="text" 
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        placeholder='Login:'
                        onClick={() => setSelectInput('top')}
                        />
                    <motion.input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder='Password:'
                        onClick={() => setSelectInput('bottom')}
                        />
                    <motion.button 
                        onClick={submit}
                        whileHover={{
							scale: 1.03,
						}}
						whileTap={{
							scale: 0.99,
						}}
                        transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    >
                        Отправить
                    </motion.button>
                </motion.div>
            </div>
            <motion.div 
                className={styles.login}
                whileHover={{
                    scale: 1.1,
                }}
                onClick={() => navigate('/login')}
            >
                Есть аккаунт? Войти
            </motion.div>
        </>
    );
}
