import React, { useState } from 'react';
import styles from '../styles/PlaylistModalWindow.module.css';
import { useAuth } from '../hooks/useAuth';

export const PlaylistModalWindow = ({fetchPlaylist}) => {
  let {user} = useAuth();
  let [name, setName] = useState('');
  let submit = async () => {
    if(name == '') return;
    let res = await fetch('/list/add',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      },
      body: JSON.stringify({name})
    });
    let ans = await res.json();
    console.log(ans)
    fetchPlaylist();
  }
  return (
    <>
      <div className={styles.back}></div>
      <div className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type='text'
          placeholder='Название плейлиста:'
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={submit}
        >
          Создать
        </button>
      </div>
    </>
  );
}
 