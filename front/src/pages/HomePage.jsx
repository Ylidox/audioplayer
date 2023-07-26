import { useEffect, useState } from 'react';
import styles from '../styles/HomePage.module.css';
import ButtonAddAudio from '../components/ButtonAddAudio';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
    let [musiks, setMusiks] = useState([]);
    let {user} = useAuth();

    const getAllMusik = async () => {
        let res = await fetch('/audio/get_all',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: user.token
                }
            }
        );
        let ans = await res.json();
        console.log(ans)
        setMusiks(ans);
    }

    useEffect(() => {
        getAllMusik();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <ButtonAddAudio/>
            </div>
        </div>
    );
}

export default HomePage;