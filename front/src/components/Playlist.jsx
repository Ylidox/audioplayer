import {useState} from 'react';
import styles from '../styles/ListPlaylist.module.css'
import stylesPlaylist from '../styles/Playlist.module.css'
import {motion} from 'framer-motion'
import {RxCross1} from 'react-icons/rx'
import { useAuth } from '../hooks/useAuth';


export const Playlist = ({playlist, currentList, setCurrentList, fetchPlaylist}) => {
  let [confirmDelete, setConfirmDelete] = useState(false);
  let {user} = useAuth();
  let toggle = (e) => {
    setCurrentList({...playlist})
    setConfirmDelete(false)
    e.stopPropagation();
  }
  let current = playlist.id === currentList.id;

  let deletePlaylist = async () => {
    let res = await fetch(`/list/delete_playlist/${playlist.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    console.log(ans);
    fetchPlaylist();
  }

  return (
    <motion.div className={`${styles.card} ${styles.playlist}`} key={playlist.id}
      onClick={toggle}
    >
      {current ? 
        confirmDelete ? 
          <div className={stylesPlaylist.delete}
            onClick={deletePlaylist}
          >Удалить плейлист</div> :
          <div className={stylesPlaylist.icon}
            onClick={(e) => {
              setConfirmDelete(true);
              e.stopPropagation();
            }}
          >
            <RxCross1/>
          </div>
        :
        null
      }

      <p
        style={(() => {
          if(current) return {
            color: 'white'
          }
        })()}
      >{playlist.name}</p>
      
      {current && <motion.div className={stylesPlaylist.back}
        layoutId='back'
      >
      </motion.div>}
    </motion.div>
  );
}
 