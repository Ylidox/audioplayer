import {createContext, useState} from 'react';

export const VolumeContext = createContext(null);

export const VolumeProvaider = ({children}) => {
  let [volume, setVolume] = useState(0.5);
  return (
    <VolumeContext.Provider value={{volume, setVolume}}>
      {children}
    </VolumeContext.Provider>
  );
}