import {useEffect, useState} from 'react';
import Menu from './Menu';
import SideMenu from './SideMenu';

function MainMenu() {
    let [size, setSize] = useState(window.innerWidth);
    let [kindMenu, setKindMenu] = useState(false);
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
    ];
    window.onresize = () => {
        setSize(window.innerWidth)
    }
    useEffect(() => {
        if(size > 630) setKindMenu(false);
        else setKindMenu(true);
    }, [size]);

    return (
        <>
            {kindMenu ? <SideMenu links={links}/> : <Menu links={links}/>}
        </>
    );
}

export default MainMenu;