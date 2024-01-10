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
		scale: 1.1,
	},
	bottom: {
		opacity: 1,
		top: '16.3vh',
		outline: '0px',
		scale: 1.1,
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

	let loginAsGuest = async (e) => {
		e.preventDefault();
		console.log(await signIn({login: 'user', password: 'user',}, () => navigate('/', {replace:true})));
	}

	return (
		<>
			<div className={styles.container}>
				<motion.div className={styles.content}>
					<motion.div 
						className={styles.select_input}
						variants={selected}
						animate={selectInput}
						transition={{ type: "spring", stiffness: 1000, damping: 20 }}
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
							scale: 1.01,
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
				className={styles.registration}
				// whileHover={{
				// 	scale: 1.1,
				// }}
				onClick={() => navigate('/registration')}
			>
				<p onClick={loginAsGuest}>Войти как гость</p>
				<p>Регистрация</p>
			</motion.div>
		</>
	);
}

export default LoginPage;