import {useEffect, useState} from 'react';
import Menu from './Menu';
import SideMenu from './SideMenu';

function MainMenu() {
    let [size, setSize] = useState(window.innerWidth);
    let [kindMenu, setKindMenu] = useState(false);
    window.onresize = () => {
        setSize(window.innerWidth)
    }
    useEffect(() => {
        if(size > 630) setKindMenu(false);
        else setKindMenu(true);
    }, [size]);

    return (
        <>
            {kindMenu ? <SideMenu/> : <Menu/>}
        </>
    );
}

export default MainMenu;