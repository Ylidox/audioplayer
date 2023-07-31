import { useState } from 'react';
import styles from '../styles/SideMenu.module.css'
import { NavLink } from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

let container = {
	show: {
		width: 300,
		height: '100vh',
		transition: { duration: 0.1 },
	},
	hidden: {
		width: 80,
		height: 80,
		transition: { 
      duration: 0.1,
      delay: 2.3,
		},
	}
}

let background = {
	show: {
    background: 'var(--dark)',
    scale: 1500,
    transition: { 
      duration: 0.5,
    },
	},
	hidden: {
    background: 'var(--light)',
    scale: 0,
    transition: { 
      duration: 0.5,
      delay: 0.8,
    },
	}
}

let button = {
	show: {
    background: 'var(--light)',
	},
	hidden: {
    background: 'var(--dark)',
	},
}
let line = {
	hidden: {
    background: 'var(--light)',
	},
	show: {
    background: 'var(--dark)',
	},
}

let li = {
	show: (index) => {
    return {
      x: 0,
      color: 'var(--light)',
      opacity: 1,
      transition: {delay: 0.2 * index,}
    }
	},
	hidden: (index) => {
    return {
      x: -200,
      color: 'var(--dark)',
      opacity: 0,
      transition: {delay: 0.2 * index,}
    }
	}
}

function SideMenu({links}) {
	let [showMenu, setShowMenu] = useState(false);
  let {setCurrent} = useAudio();
	
	return (
			
    <motion.div 
      className={styles.container}
      variants={container}
      animate={showMenu ? 'show' : 'hidden'}
      initial={'hidden'}
      onClick={() => {}}
    >
      <motion.div
        className={styles.background}
        variants={background}
        animate={showMenu ? 'show' : 'hidden'}
      ></motion.div>
      <motion.div 
        className={styles.burger_button} 
        onClick={() => setShowMenu(!showMenu)}
        variants={button}
        animate={showMenu ? 'show' : 'hidden'}
        whileHover={{
          scale:1.2
        }}
      >
        <motion.div className={styles.line} variants={line} animate={showMenu ? 'show' : 'hidden'}></motion.div>
        <motion.div className={styles.line} variants={line} animate={showMenu ? 'show' : 'hidden'}></motion.div>
        <motion.div className={styles.line} variants={line} animate={showMenu ? 'show' : 'hidden'}></motion.div>
      </motion.div>
      <AnimatePresence>
      {showMenu && 
      <motion.ul 
        className={styles.ul_container}
      >
        {links.map((item, index) => 
          <motion.li
            onClick={() => setShowMenu(!showMenu)}
            variants={li}
            animate={showMenu ? 'show' : 'hidden'}
            custom={index}
            initial={'hidden'}
            exit={'hidden'}
            whileHover={{
              background: 'var(--light)',
              scale: 1.1,
              transition: {
                delay: 0,
              }
            }}
            key={index}
          >
            <NavLink to={item.href}
              // onClick={() => setCurrent({index:null, id:null})}
            >
              {item.title}
            </NavLink>
          </motion.li>
        )}
      </motion.ul>}
      </AnimatePresence>
    </motion.div>
    
	);
}

export default SideMenu;