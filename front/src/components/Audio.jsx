import {useState, useRef, useEffect} from 'react';
import styles from '../styles/Audio.module.css';
import { useAuth } from '../hooks/useAuth';
import {motion, AnimatePresence} from 'framer-motion'
import ReactAudioPlayer from 'react-audio-player';
import { AiFillHeart, AiOutlineHeart, AiOutlineMore} from 'react-icons/ai';
import { AudioModalWindow } from './AudioModalWindow';

function Audio({song, play, setPlay, next, onLike}) {
    let {user} = useAuth();
    let audio = useRef(null);

    let [modal, setModal] = useState(false); 

    let [duration, setDuration] = useState(0);
    let [currentTime, setCurrentTime] = useState(0);
    let [progres, setProgres] = useState(0);

    let [like, setLike] = useState(song.liked);

    let toggle = (e) => {
        e.preventDefault();
        let ref = audio.current.audioEl.current;
        if(ref.paused){
            ref.play();
            setPlay();
        }
        else ref.pause();
        e.stopPropagation();
    }

    let toggle_like = async (e) => {
        e.stopPropagation();
        let liked = !like;
        setLike(!like);
        onLike(!like);
        let res = await fetch('/audio/like', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: user.token
            },
            body: JSON.stringify({
                musik_id: song.id,
                like: liked
            })
        });
        let ans = await res.json();
    }

    let updateTime = () => {
        let ref = audio.current.audioEl.current;
        setDuration(ref.duration);
        setCurrentTime(ref.currentTime);
    }

    let handleProgres = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let value = e.target.value;
        let ref = audio.current.audioEl.current;
        let currentTime = value / 100 * duration;
        setCurrentTime(currentTime);
        ref.currentTime = currentTime;

        setPlay();
    }

    let toStringTime = () => {
        let c = {
            s: Math.floor(currentTime % 60) + '',
            m: Math.floor(currentTime / 60),
        }
        let d = {
            s: Math.floor(duration % 60),
            m: Math.floor(duration/ 60),
        }
        if(c.s.length == 1) c.s = '0' + c.s;
        return <p>{c.m}:{c.s}/<wbr/>{d.m}:{d.s}&nbsp;</p>;
    }
    
    useEffect(() => {
        setProgres(currentTime / duration);
    }, [duration]);
    useEffect(() => {
        setProgres(currentTime / duration);
    }, [currentTime]);

    useEffect(() => {
        let ref = audio.current.audioEl.current;
        if(!play){
            ref.pause();
            ref.currentTime = 0;
            setCurrentTime(0)
            setProgres(0)
        }else{
            ref.play();
            setPlay();
        }
    }, [play]);

    return (
        <motion.div 
            className={styles.container}
            initial={{
                border: '1px solid rgba(0, 0, 0, 0)',

            }}
            whileHover={{
                border: '1px solid var(--light)',
            }}
            onClick={toggle}
        >
            {play && <motion.div
                layoutId='back'
                className={styles.background}
            ></motion.div>}
            <div className={styles.content}>
                <div className={styles.data}>
                    <div className={styles.name}>{song.name}</div>
                    <div className={styles.author}>{song.author}</div>
                </div>
                <div className={styles.progres_area}
                    // onClick={(e) => e.stopPropagation()}
                >
                    <motion.input
                        className={styles.progres} 
                        type="range"
                        min={0}
                        max={100}
                        value={progres*100}
                        onInput={handleProgres}
                        onClick={(e) => e.stopPropagation()}

                        step={1}
                        whileHover={{
                            height: '10px',
                        }}
                    />
                </div>
                <div className={styles.time}>{toStringTime()}</div>
                <div className={styles.like_container}
                    onClick={toggle_like}
                >
                    {like ?
                        <AiFillHeart 
                            className={styles.like_on}
                        /> :
                        <AiOutlineHeart
                            className={styles.like_off}
                            // onClick={toggle_like}
                        />
                    }
                </div>
                <div className={styles.more_container}
                    onClick={(e) => {
                        e.stopPropagation();
                        setModal(!modal)
                    }}
                >
                    {modal ? 
                        <AiOutlineMore className={styles.more_on}/> :
                        <AiOutlineMore className={styles.more_off}/>
                    }
                    <AnimatePresence>
                        {modal ? <AudioModalWindow song={song}/> : null}
                    </AnimatePresence>
                </div>
                <ReactAudioPlayer 
                    src={`file/${user.login}/${song.path}`} 
                    ref={audio}
                    preload='metadata'
                    listenInterval={10}
                    onListen={updateTime}
                    onLoadedMetadata={updateTime}
                    onEnded={next}
                />
            </div>
        </motion.div>
    );
}

export default Audio;