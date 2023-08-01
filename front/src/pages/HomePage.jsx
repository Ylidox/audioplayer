import { useEffect, useState } from 'react';
import styles from '../styles/HomePage.module.css';
import ButtonAddAudio from '../components/ButtonAddAudio';
import { useAuth } from '../hooks/useAuth';
import { useAudio } from '../hooks/useAudio';
import ListAudio from '../components/ListAudio';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    let {user, signOut} = useAuth();
    let {setCurrent, musiks, setMusiks} = useAudio();

    let navigate = useNavigate();

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
        if(res.status == 404) signOut(() => navigate('/login'));
        // console.log(ans)
        //if(ans.length !== musiks.length) 
        setMusiks(ans);
    }

    useEffect(() => {
        getAllMusik();
        // setCurrent({
        //     index: null,
        //     id: null,
        // });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <ButtonAddAudio/>
                <ListAudio songs={musiks}/>
            </div>
        </div>
    );
}

export default HomePage;