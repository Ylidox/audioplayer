import React, { useState } from 'react';
import styles from '../styles/SideControlUnit.module.css';
import {motion, AnimatePresence} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import { useVolume } from '../hooks/useVolume';

import {BiPlay, BiPause} from 'react-icons/bi'
import {FiVolumeX, FiVolume, FiVolume1, FiVolume2} from 'react-icons/fi'
import {PiShuffle, PiMusicNoteSimpleLight} from 'react-icons/pi'

export const SideControlUnit = () => {
  let [show, setShow] = useState(false);
  let {run, setRun, musiks, next, current, setCurrent, mix} = useAudio();
  let {volume, setVolume} = useVolume();
  
  let getIconVolume = () => {
    if(volume == 0) return <FiVolumeX className={styles.volume_icon}/>;
    if(volume < 0.33) return <FiVolume className={styles.volume_icon}/>
    if(volume < 0.66) return <FiVolume1 className={styles.volume_icon}/>
    if(volume <= 1) return <FiVolume2 className={styles.volume_icon}/>
  }

  let changeVolume = (e) => {
    setVolume(+e.target.value);
  }

  return (
    <>
      <div 
        className={styles.click_listener}
        onClick={(e) => {
          e.preventDefault()
          setShow(false)
        }}
      >
      </div> 
      <AnimatePresence>
        {show && 
        <motion.div className={styles.container}
          initial={{right: '-80px',}}
          animate={{right: '20px',}}
          exit={{right: '-80px',}}
        >
          <div className={styles.content}>
            <div className={styles.volume_container}>
              <input 
                className={styles.input} 
                type='range' min='0' max='1' step={0.01}
                value={volume}
                onInput={changeVolume}  
              />
              <PiMusicNoteSimpleLight 
                className={styles.note} 
                onClick={(e) => e.preventDefault()}
              />
            </div>
            <div className={styles.button}
              onClick={(e) => {
                e.stopPropagation();
                setRun(!run);
                if(current.index === null && !run){
                  current.index = musiks.length - 1;
                  setCurrent(current);
                  next();
                }
              }}
            >
              {run ? 
                <BiPause className={styles.pause}/> :
                <BiPlay className={styles.play}/>
              }
            </div>
            <div className={styles.button}
              onClick={() => mix()}
            >
              <PiShuffle className={styles.shuffle}/>
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>
      <div className={styles.volume_button}
        onClick={() => setShow(!show)}
      >
       {getIconVolume()}  
      </div>
    </>
  );
}