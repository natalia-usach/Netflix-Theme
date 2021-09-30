import React from 'react';
import { NavLink } from 'react-router-dom';
import s from '../../styles/App.css';

const Nav = () => {
    return (
        <>
                    <div className='nav'><NavLink to='/home' activeClassName={s.active}>Home</NavLink></div>
                    <div className='nav'><NavLink to='/tv-shows'>TV Shows</NavLink></div>
        </>
    );
};

export default Nav;