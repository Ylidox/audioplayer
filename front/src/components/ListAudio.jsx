import { useState } from 'react';
import Audio from './Audio';
import {motion, AnimateSharedLayout} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import { useAuth } from '../hooks/useAuth';

function ListAudio({songs}) {
  let {musiks, setMusiks, current, setCurrent, next, run, setRun, setAudioEl} = useAudio();
  let {user} = useAuth();
  return (
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative',
    }}
      layout
    >
      {!!songs.length ? songs.map((item, index) => 
        <Audio 
          song={item} 
          key={item.id} 
          play={(current.id === item.id) && run} 
          setPlay={() => {
            setCurrent({id:item.id, index, path:item.path});
            setRun(true);
          }}
          next={next}
          onLike={(like) => {
            musiks[index].liked = like;
            setMusiks([...musiks]);
          }}
          current={current}
          setRun={setRun}
          setAudioEl={setAudioEl}
        />
      ) :
      <div style={{
        color: 'var(--light_background)',
        textAlign: 'center',
        // margin: '0 auto',
      }}>Нет композиций</div>}
    </motion.div>
  );
}

export default ListAudio;