import React, { useEffect, useState } from 'react';
import styles from '../styles/AudioModalWindow.module.css';
import {MdDeleteOutline, MdOutlineChangeCircle} from 'react-icons/md';
import {CgAdd} from 'react-icons/cg'
import { useAudio } from '../hooks/useAudio';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

let variants_container = {
  initial:{
    left: '-100px',
    opacity: 0,
  },
  animate: {
    left: '-175px',
    opacity: 1,
  },
  exit: {
    left: '-100px',
    opacity: 0,
  }
}

export const AudioModalWindow = ({song}) => {
  let navigate = useNavigate();
  let {musiks, setMusiks} = useAudio();
  let {user} = useAuth();

  let [showConfirm, setShowConfirm] = useState(false)
  let [confirm, setConfirm] = useState(false);

  let deleteMusik = async () => {
    let audio = musiks.filter((item) => item.id != song.id);
    setMusiks([...audio]);
    let res = await fetch(`/audio/delete/${song.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    console.log(ans)
  }

  return (
    <>
      <div className={styles.back}></div>
      <motion.div 
        className={styles.container}
        variants={variants_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
      >
        <ul className={styles.list}>
          <li className={styles.li}><CgAdd />Добавить в плейлист</li>
          <li className={styles.li}
            onClick={() => navigate('/change_audio', {state: {song}})}
          ><MdOutlineChangeCircle />Изменить</li>
          <li className={styles.delete}
            onClick={() => {
              setShowConfirm(true);
            }}
          >
            {!showConfirm ? 
              <><MdDeleteOutline />Удалить</> :
              <div onClick={deleteMusik}>Подтвердить удаление</div>
            }
          </li>
        </ul>
      </motion.div>
    </>
  );
}