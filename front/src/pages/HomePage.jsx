import React from 'react';
import styles from '../styles/HomePage.module.css';
import ButtonAddAudio from '../components/ButtonAddAudio';

function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <ButtonAddAudio/>
            </div>
        </div>
    );
}

export default HomePage;