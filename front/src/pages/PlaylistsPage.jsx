import React, { useEffect, useState } from 'react';
import styles from '../styles/PlaylistsPage.module.css'
import { ListPlaylist } from '../components/ListPlaylist';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAudio } from '../hooks/useAudio';
import ListAudio from '../components/ListAudio';

export const PlaylistsPage = () => {
  let {user, signOut} = useAuth();
  let [list, setList] = useState([]);
  let {musiks, setMusiks} = useAudio();
  let [currentList, setCurrentList] = useState({
    id: null,
    name: null,
  });
  let navigate = useNavigate();

  let getListPlaylists = async () => {
    let res = await fetch('/list/get_playlists',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    if(res.status == 404) signOut(() => navigate('/login'));
    setList(ans);
  }

  let getMusiks = async () => {
    let res = await fetch(`/list/get_musiks/${currentList.id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    setMusiks(ans);
  }

  // useEffect()

  useEffect(() => {
    getListPlaylists();
  }, []);

  useEffect(() => {
    if(currentList.id !== null) getMusiks();
  }, [currentList]);


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListPlaylist 
          list={list}
          currentList={currentList}
          setCurrentList={setCurrentList}
          fetchPlaylist={getListPlaylists}
        />
        {currentList.id && 
          <div className={styles.list_container}>
            <div className={styles.list_name}>
              {currentList.name}
            </div>
            <ListAudio songs={musiks}/>
          </div>
        }
      </div>
    </div>
  );
}