import { useState } from 'react';
import Audio from './Audio';
import {motion} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

function ListAudio({songs}) {
  let {musiks, setMusiks, current, setCurrent, next} = useAudio();

  return (
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
      layout
    >
      {songs.length && songs.map((item, index) => 
        <Audio 
          song={item} 
          key={item.id} 
          play={current.id === item.id} 
          setPlay={() => {
            setCurrent({id:item.id, index})
          }}
          next={next}
          onLike={(like) => {
            musiks[index].liked = like;
            setMusiks([...musiks]);
          }}
        />
      )}
    </motion.div>
  );
}

export default ListAudio;