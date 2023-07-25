import React from 'react';
import styles from '../styles/ButtonAddAudio.module.css'
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ButtonAddAudio() {
    let navigate = useNavigate();
    return (
        <motion.div 
            className={styles.container}
            whileHover={{
                scale: 1.05,
                background: 'var(--light)',
                color: 'rgb(255, 255, 255)'
            }}
            onClick={() => navigate('/add_audio')}
        >
            <div className={styles.content}>
                <div className={styles.logo}>
                    <div className={styles.vertical}></div>
                    <div className={styles.horizontal}></div>
                </div>
                <div className={styles.text}>
                    Добавить музыку
                </div>
            </div>
        </motion.div>
    );
}

export default ButtonAddAudio;