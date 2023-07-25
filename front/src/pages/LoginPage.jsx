import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from '../styles/LoginPage.module.css'
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
        scale: 1.3,
    },
    bottom: {
        opacity: 1,
        top: '16.3vh',
        outline: '0px',
        scale: 1.3,
    },
}

function LoginPage() {
    let [selectInput, setSelectInput] = useState('initial');
    let [login, setLogin] = useState(''); 
    let [password, setPassword] = useState('');
    let {signIn} = useAuth();
    let navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        console.log(await signIn({login, password}, () => navigate('/', {replace:true})));
    }

    return (
        <>
            <div className={styles.container}>
                <motion.div className={styles.content}>
                    <motion.div 
                        className={styles.select_input}
                        variants={selected}
                        animate={selectInput}
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
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
                            scale: 1.2,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                        Отправить
                    </motion.button>
                </motion.div>
            </div>
            <motion.div 
                className={styles.registration}
                whileHover={{
                    scale: 1.1,
                }}
                onClick={() => navigate('/registration')}
            >
                Регистрация
            </motion.div>
        </>
    );
}

export default LoginPage;