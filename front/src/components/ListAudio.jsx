import { useState } from 'react';
import Audio from './Audio';
import {motion} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

function ListAudio({songs}) {
  // let [play, setPlay] = useState(null)
  let {current, setCurrent, next} = useAudio();

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
          play={current === index} 
          setPlay={() => {
            setCurrent(index)
          }}
          next={next}
        />
      )}
    </motion.div>
  );
}

export default ListAudio;