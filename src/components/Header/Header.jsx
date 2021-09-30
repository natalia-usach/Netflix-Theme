import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {}
        };
    }

    render() {
        return (
            <header>
                <Nav/>
                <div className='login'>
                    <NavLink to='/register'>Register</NavLink>
                    <NavLink to='/login'>Login</NavLink>
                </div>
                <NavLink to='/room'>My Room</NavLink>
            </header>
        );
    }
}

export default Header;