import React, { useEffect, useState, useRef} from 'react';
import styles from '../styles/AudioPlayer.module.css';
import ReactAudioPlayer from 'react-audio-player';
import {BiSolidChevronsLeft, BiSolidChevronsRight, BiPlay, BiPause} from 'react-icons/bi'
import {PiShuffle} from 'react-icons/pi'
import {AiOutlineSound} from 'react-icons/ai'
import {IoReloadOutline} from 'react-icons/io5'
import {motion} from 'framer-motion'
import { useAudio } from '../hooks/useAudio';
import { useAuth } from '../hooks/useAuth';
import { useVolume } from '../hooks/useVolume';

export const AudioPlayer = () => {
  let {user} = useAuth();
  let {run, setRun, musiks, current, audioEl, setAudioEl, next, previous, mix} = useAudio();
  let {volume} = useVolume();

  let [song, setSong] = useState({});
  let [duration, setDuration] = useState(audioEl.duration);
  let [currentTime, setCurrentTime] = useState(audioEl.currentTime);
  let [progres, setProgres] = useState(audioEl.currentTime / audioEl.duration);
  let audio = useRef(null);

  let handleProgres = (e) => {
    if(audio.current === null) return;
    e.preventDefault();
    e.stopPropagation();

    let value = +e.target.value;
    setProgres(value)
    let ref = audio.current.audioEl.current;
    let currentTime = value * duration;
    setCurrentTime(currentTime);
    ref.currentTime = currentTime
  }

  let updateTime = () => {
    if(audio.current === null) return;

    let ref = audio.current.audioEl.current;
    setDuration(ref.duration);
    setCurrentTime(ref.currentTime);
  }

  useEffect(() => {
    if(audio.current === null) return;
    let song = musiks[current.index];
    setSong(song);
    setDuration(audioEl.duration);
    setCurrentTime(audioEl.currentTime);
    let ref = audio.current.audioEl.current;
    ref.currentTime = audioEl.currentTime;
    // setAudioEl(ref);
  }, []);

  useEffect(() => {
    if(audio.current === null) return;
    setSong(musiks[current.index])
    let ref = audio.current.audioEl.current;
    if(run){
      ref.play();
    }
  }, [current])

  useEffect(() => {
    setProgres(currentTime / duration);
  }, [duration]);
  useEffect(() => {
    setProgres(currentTime / duration);
  }, [currentTime]);

  // useEffect(() => {
  //   if(audioEl.duration === undefined) next();
  // }, [audioEl]);

  useEffect(() => {
    if(audio.current === null) return;

    let ref = audio.current.audioEl.current;
    if(run){
      ref.play();
    }
    else{
      ref.pause();
    }
  }, [run]);

  let toStringTime = (time) => {
    let c = {
      s: Math.floor(currentTime % 60) + '',
      m: Math.floor(currentTime / 60),
    }
    let d = {
      s: Math.floor(duration % 60),
      m: Math.floor(duration/ 60),
    }
    if(c.s.length == 1) c.s = '0' + c.s;
    if(time == 'c') return <>{c.m}:{c.s}</>;
    else if(time == 'd') return <>{d.m}:{d.s}&nbsp;</>
  }

  return (
    <div className={styles.container}>
      {audioEl.duration === undefined ? <div style={{color:'white'}}>Выберите песню</div> : 
        <div className={styles.content}>
          <div className={styles.block}>
            <AiOutlineSound className={styles.sound}/>
          </div>
          <div className={styles.control_container}>
            <div className={styles.progres_container}>
              <div className={styles.time}>
                {toStringTime('c')}
              </div>
                <div className={styles.progres_area}>
                  <motion.input type='range' className={styles.progres}
                    whileHover={{
                      height: '10px',
                    }}
                    min='0' max='1' step='0.01'
                    value={progres}
                    onInput={handleProgres}
                  />
                </div>
              <div className={styles.time}>
                {toStringTime('d')}
              </div>
            </div>
            <div className={styles.musik}>
              <p className={styles.name}>{song.name}</p>
              <p className={styles.author}>{song.author}</p>
            </div>
            <div className={styles.control}>
              <div className={styles.icon_container}
                onClick={mix}
              >
                <PiShuffle className={styles.shuffle}/>              
              </div>
              <div className={styles.icon_container}
                onClick={() => {
                  previous();
                  let ref = audio.current.audioEl.current;
                  ref.currentTime = 0;
                }}
              >
                <BiSolidChevronsLeft className={styles.left}/>
              </div>
              <div className={styles.icon_container}
                onClick={() => setRun(!run)}
              >
                {run ?  
                  <BiPause className={styles.play}/>:
                  <BiPlay className={styles.play}/>
                }
              </div>
              <div className={styles.icon_container}
                onClick={() => {
                  next();
                  let ref = audio.current.audioEl.current;
                  ref.currentTime = 0;
                }}
              >
                <BiSolidChevronsRight className={styles.right}/>
              </div>
              <div className={styles.icon_container}
                onClick={() => {
                  let ref = audio.current.audioEl.current;
                  ref.currentTime = 0;
                  updateTime();
                }}
              >
                <IoReloadOutline className={styles.reload}/>
              </div>
            </div>
          </div>
          <ReactAudioPlayer 
            src={`file/${user.login}/${current.path}`} 
            ref={audio}
            preload='metadata'
            listenInterval={10}
            onListen={updateTime}
            onLoadedMetadata={updateTime}
            onEnded={next}
            volume={volume}
          />
        </div>
      }
    </div>
  );
}
 