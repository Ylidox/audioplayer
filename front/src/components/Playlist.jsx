import React from 'react';
import styles from '../styles/ListPlaylist.module.css'
import stylesPlaylist from '../styles/Playlist.module.css'
import {motion} from 'framer-motion'
import {RxCross1} from 'react-icons/rx'

export const Playlist = ({playlist, currentList, setCurrentList}) => {
  let toggle = () => {
    setCurrentList({...playlist})
  }
  let current = playlist.id === currentList.id;

  return (
    <motion.div className={`${styles.card} ${styles.playlist}`} key={playlist.id}
      onClick={toggle}
    >
      {current &&
        <div className={stylesPlaylist.icon}>
          <RxCross1/>
        </div>
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
 