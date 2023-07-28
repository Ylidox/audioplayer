import { useState } from 'react';
import Audio from './Audio';
import {motion} from 'framer-motion';

function ListAudio({songs}) {
  let [play, setPlay] = useState(null)
  return (
    <motion.div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    }}
      layout
    >
      {songs.length && songs.map((item, index) => 
        <Audio song={item} key={item.id} play={play === index} setPlay={() => {
          setPlay(index)
        }}/>
      )}
    </motion.div>
  );
}

export default ListAudio;