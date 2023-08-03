import {useState} from 'react';
import styles from '../styles/ListPlaylist.module.css'
import {motion} from 'framer-motion'
import { Playlist } from './Playlist';
import { PlaylistModalWindow } from './PlaylistModalWindow';

export const ListPlaylist = ({list, currentList, setCurrentList, fetchPlaylist}) => {
  let [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.container}>
      <motion.div className={styles.content} layout={'list'}>
        <motion.div 
          className={`${styles.card} ${styles.add}`}
          whileHover={{
            scale: 1.01,
            background: 'var(--light)',
            color: 'rgb(255, 255, 255)'
          }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <p>+Добавить</p>
          {showMenu && 
            <PlaylistModalWindow fetchPlaylist={fetchPlaylist}/>
          }
        </motion.div>
        {list.map(item => 
          <Playlist
            playlist={item}
            currentList={currentList}
            setCurrentList={setCurrentList}
            fetchPlaylist={fetchPlaylist}
          />
        )}
      </motion.div>
    </div>
  );
}
