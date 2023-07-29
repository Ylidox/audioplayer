import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import styles from '../styles/ChangeAudio.module.css'
import {motion} from 'framer-motion'
import { useAuth } from '../hooks/useAuth';

let background = {
  initial:{
    scale: 0,
    top: '0',
  },
  name: {
    top: '0',
  },
  author: {
    top: 'calc(10vh + 24px)',
  }
}

export const ChangeAudio = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let {user} = useAuth();
  let [song, setSong] = useState(location.state.song);
  let [input, setInput] = useState('initial');
  let [name, setName] = useState(location.state.song.name);
  let [author, setAuthor] = useState(location.state.song.author);

  let submit = async () => {
    let res = await fetch(`/audio/change/${song.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      },
      body: JSON.stringify({name, author})
    });
    
    res.json()
      .then(result => {
        navigate('/');
        console.log(result);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
          placeholder='Название'
        />
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
          Изменить
        </motion.button>
      </div>
    </div>
  );
}