import {createContext, useState} from 'react';

export const AudioContext = createContext(null);

export const AudioProvaider = ({children}) => {
    let [musiks, setMusiks] = useState([]);
    let [current, setCurrent] = useState({
        index: null,
        id: null
    });

    let next = () => {
        current.index++;
        current.index %= musiks.length;
        current.id = musiks[current.index].id;
        setCurrent({...current});
    }

    let mix = () => {
        let out = [];
        while(musiks.length){
            let index = Math.floor(Math.random() * musiks.length);
            out.push(musiks[index]);
            musiks.splice(index, 1);
        }
        setMusiks(out)
    }

    return (
        <AudioContext.Provider value={{current, setCurrent, musiks, setMusiks, next, mix}}>
            {children}
        </AudioContext.Provider>
    );
}
