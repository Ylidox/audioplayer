import {useEffect} from 'react';
import ListAudio from '../components/ListAudio';
import styles from '../styles/LikedMusik.module.css'
import { useAudio } from '../hooks/useAudio';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LikedMusik = () => {
  let {user, singOut} = useAuth();
  let {musiks, setMusiks} = useAudio();
  let navigate = useNavigate();

  const getLikedMusik = async () => {
    let res = await fetch('/audio/get_liked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: user.token
      }
    });
    let ans = await res.json();
    if(res.status == 404){
      singOut(navigate('/login'));
      return;
    }
    setMusiks(ans)
    // console.log(ans)
    // if(ans.length !== musiks.length) setMusiks(ans);
  }

  useEffect(() => {
    getLikedMusik();
}, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListAudio songs={musiks}/>
      </div>
    </div>
  );
}
