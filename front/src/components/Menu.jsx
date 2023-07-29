import React, { useState } from 'react';
import styles from '../styles/Menu.module.css'
import { NavLink } from 'react-router-dom';
import {motion} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

function UnderLine(){
    return (
        <motion.div
            layout
            className={styles.underline}
            layoutId='underline'
        ></motion.div>
    );
}

function Menu() {
    let [select, setSelect] = useState('/');
    let {setCurrent} = useAudio();
    let setClass = (isActive, state) => {
        if(isActive) setSelect(state);
        return isActive ? styles.select_a : styles.a;
    }
    let links = [
        {
          title: 'Песни',
          href: '/'
        },
        {
          title: 'Слушать',
          href: '/listen'
        },
        {
          title: 'Избранное',
          href: '/liked'
        },
        {
          title: 'Плейлисты',
          href: '/lists'
        },
    ]
    return (
        <div className={styles.container}>
            <motion.div className={styles.content} >
                {links.map((item, index) => {
                    return (
                        <motion.div 
                            className={styles.link} 
                            key={index}
                            whileHover={{
                                background:'var(--light_background)',
                            }}
                            style={{
                                background:'var(--background)',
                            }}
                        >
                            <NavLink 
                                to={item.href} 
                                className={({isActive}) => setClass(isActive, item.href)}
                                onClick={() => setCurrent({index:null, id:null})}
                            >{item.title}</NavLink>
                            {select===item.href && <UnderLine/>}

                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

export default Menu;