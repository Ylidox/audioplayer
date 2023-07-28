import {useState, useRef} from 'react';
import styles from '../styles/AddAudio.module.css'
import { useAuth } from '../hooks/useAuth';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

let add_button = {
    show: {
        background: 'var(--light)',
        scale: 1.05,
        color: 'rgb(255, 255, 255)',
    },
    hidden: {
        background: 'rgba(0, 0, 0, 0)',
        scale: 1,
        color: 'rgb(150, 150, 150)'
    }
}

let background = {
    initial:{
        position: 'absolute',
        scale: 0,
        top: 'calc(10vh + 20px)',
    },
    name: {
        top: 'calc(10vh + 20px)',
    },
    author: {
        top: 'calc(20vh + 43px)',
    }
}

function AddAudio() {
    let [dragFile, setDragFile] = useState(false);
    let [input, setInput] = useState('initial');
    let fileInput = useRef(null);
    let {user} = useAuth();
    let [file, setFile] = useState(null);
    let [name, setName] = useState('');
    let [author, setAuthor] = useState('');
	let [token, setToken] = useState(user.token);
    let navigate = useNavigate();

    let dropFile = (e) => {
        console.log(e.dataTransfer.files[0].name)
        e.preventDefault();
        setFile(e.dataTransfer.files[0])
        setName(e.dataTransfer.files[0].name);
    }

    let changeFileHandler = (event) => {
        setFile(event.target.files[0]);
		setName(event.target.files[0].name);
    }

    let clickFileInput = () => {
        fileInput.current.click();
    }

	let submit = async (event) => {
		event.preventDefault();
        if(!file || !name) return;
		let url = `/audio/add`;
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('author', author);

		console.log(file, name, author)

        let res = await fetch(url, {
            method:'POST',
            headers: {
                authorization: token
            },
            body: formData
        });
        let ans = await res.json();
        navigate('/');
        console.log(ans);
	}

    let dragStart = (e) => {
        e.preventDefault();
        setDragFile(true);
    }

    let dragEnd = (e) => {
        e.preventDefault();
        setDragFile(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <input type="file" onChange={changeFileHandler} ref={fileInput} className={styles.hidden}/>
                <motion.button 
                    className={styles.add_button}
                    onClick={clickFileInput}
                    onDragEnter={dragStart}
                    onDragLeave={dragEnd}
                    onDrop={dropFile}
                    variants={add_button}
                    initial={'hidden'}
                    animate={() => dragFile ? 'show' : 'hidden'}
                    whileTap={'show'}
                    whileHover={'show'}
                >
                    {file ? 'Файл добавлен' : '+Добавить файл'}
                </motion.button>
                <motion.div
                    className={styles.background_input}
                    variants={background}
                    animate={() => input}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                ></motion.div>
                <input 
                    className={styles.input}
                    onClick={() => setInput('name')}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Название'/>
                <input 
                    className={styles.input}
                    onClick={() => setInput('author')}
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    placeholder='Автор'
                    />
                <motion.button 
                    onClick={submit}
                    className={styles.submit_button}
                    whileHover={{
                        scale: 1.05,
                        color: 'rgb(255, 255, 255)',
                    }}
                >
                    Отправить
                </motion.button>
            </div>
        </div>
    );
}

export default AddAudio;