import { useState } from 'react';
import Audio from './Audio';
import {motion, AnimateSharedLayout} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

function ListAudio({songs}) {
  let {musiks, setMusiks, current, setCurrent, next, run, setRun} = useAudio();

  return (
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
      layout
    >
      {!!songs.length ? songs.map((item, index) => 
        <Audio 
          song={item} 
          key={item.id} 
          play={(current.id === item.id) && run} 
          setPlay={() => {
            setCurrent({id:item.id, index});
            setRun(true);
          }}
          next={next}
          onLike={(like) => {
            musiks[index].liked = like;
            setMusiks([...musiks]);
          }}
          current={current}
          setRun={setRun}
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