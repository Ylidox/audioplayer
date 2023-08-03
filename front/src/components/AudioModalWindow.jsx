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
  let [currentPlaylist, setCurrentPlaylist] = useState({});
  let [playlists, setPlaylists] = useState([]);
  let [showConfirm, setShowConfirm] = useState(false)
  let [deleteFromPlaylist, setDeleteFromPlaylist] = useState(false);

  let [showListPlaylist, setShowListPlaylist] = useState(false)


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

  let getSelfPlaylist = async (id = song.playlist_id ) => {
    if(id === null) return false;
    let res = await fetch(`/list/get_playlist_by_id/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    setCurrentPlaylist(ans);
  }

  let getPlaylists = async () => {
    let res = await fetch(`/list/get_playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    setPlaylists(ans);
  }

  let addMusikToPlaylist = async (playlist_id) => {
    let res = await fetch(`/list/add_musik/${playlist_id}/${song.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    console.log(ans);
    setShowListPlaylist(false);
    getSelfPlaylist(playlist_id);;
  }

  let handleDeleteFromPlaylist = async () => {
    let res = await fetch(`/list/delete_musik/${song.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    setDeleteFromPlaylist(false);
    setCurrentPlaylist({id:null, name:null});
  }


  useEffect(() => {
    getSelfPlaylist();
    // getPlaylists();
    console.log('use effect self playlist');
  }, []);

  useEffect(() => {
    if(showListPlaylist) getPlaylists();
    console.log('use effect list playlists: ', showListPlaylist);
  }, [showListPlaylist]);

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
        {!showListPlaylist ? 
          <ul className={styles.list}>
            {currentPlaylist.name ?
              !deleteFromPlaylist ?
                <li className={styles.li} onClick={() => setDeleteFromPlaylist(true)}>Удалить из {currentPlaylist.name}</li> :
                <li className={styles.delete}
                  onClick={handleDeleteFromPlaylist}
                >
                  Подтвердить удаление
                </li>
              :
              <li className={styles.li} onClick={() => setShowListPlaylist(true)}><CgAdd />Добавить в плейлист</li>
            }
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
                <div onClick={deleteMusik}>
                  Подтвердить удаление
                </div>
              }
            </li>
          </ul> 
          :
          <ul className={styles.list}>
            {playlists.map((item) => {
              return <li 
                className={styles.li} 
                key={item.id}
                onClick={() => addMusikToPlaylist(item.id)}
              >
                {item.name}
              </li>
            })}
          </ul>
          }
      </motion.div>
    </>
  );
}