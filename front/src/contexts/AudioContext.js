import {createContext, useState} from 'react';

export const AudioContext = createContext(null);

export const AudioProvaider = ({children}) => {
    let [musiks, setMusiks] = useState([]);
    let [run, setRun] = useState(false);
    let [current, setCurrent] = useState({
        index: null,
        id: null,
        path: null,
    });
    let [audioEl, setAudioEl] = useState({});

    let next = () => {
        current.index++;
        current.index %= musiks.length;
        current.id = musiks[current.index].id;
        current.path = musiks[current.index].path;
        setCurrent({...current});
    }

    let previous = () => {
        current.index--;
        if(current.index == -1) current.index = musiks.length - 1;
        current.id = musiks[current.index].id;
        current.path = musiks[current.index].path;
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
        <AudioContext.Provider value={{run, setRun, current, setCurrent, musiks, setMusiks, next, previous, mix, audioEl, setAudioEl}}>
            {children}
        </AudioContext.Provider>
    );
}
