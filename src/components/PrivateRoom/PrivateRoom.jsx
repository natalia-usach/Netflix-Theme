import React, { useEffect, useState } from "react";
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { db } from '../../firebaseDB';
import { NavLink } from "react-router-dom";
import DropDownList from "./DropdownList";

const PrivateRoom = (props) => {
    const [usersList, setUsersList] = useState([]);
    const [friends, setFriends] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [movie, setMovie] = useState('');

    const defaultUsersList = [{name: 'Ania', email: 'ania@mail.com'}, {name: 'Vika', email: 'vika@mail.com'}, {name: 'Marry', email: 'marry@mail.com'}];

    const addFriend = (e) => {
        setFriends([...friends, e.target.previousSibling.textContent]);
        sessionStorage.setItem(e.target.previousSibling.textContent, 'friended');
        if(!sessionStorage.getItem('friendsList')) {
            sessionStorage.setItem('friendsList', JSON.stringify([e.target.previousSibling.textContent]));
        } else {
            let friendsList = JSON.parse(sessionStorage.friendsList);
            friendsList.push(e.target.previousSibling.textContent);
            sessionStorage.friendsList = JSON.stringify(friendsList);
        }
    }

    const removeFriend = (e) => {
        setFriends([...friends].filter(el => el !== e.target.previousSibling.textContent));
        sessionStorage.removeItem(e.target.previousSibling.textContent);
        let friendsList = JSON.parse(sessionStorage.friendsList);
        sessionStorage.friendsList = JSON.stringify(friendsList.filter(el => el !== e.target.previousSibling.textContent));
    }

    useEffect(() => {
        if(!sessionStorage.getItem('usersList') || JSON.parse(sessionStorage.usersList).length === 1) {
            setUsersList(defaultUsersList.map((user, id) => sessionStorage.getItem(user.name) !== 'friended' 
            ? 
            <div className='listItem' key={id}>
                <li key={id}>{user.name}</li>
                <button onClick={addFriend}>Add a friend</button>
            </div>
            :
            <div className='listItem' key={id}>
                <li key={id}>{user.name}</li>
                <button className='removeFriend' onClick={removeFriend}>Remove a friend</button>
                </div>
            ));
        } else {
            setUsersList([...JSON.parse(sessionStorage.usersList)].filter(el => el !== sessionStorage.getItem('nickname')).map((user, id) => sessionStorage.getItem(user) !== 'friended' 
            ? 
            <div className='listItem' key={id}>
                <li key={id}>{user}</li>
                <button onClick={addFriend}>Add a friend</button>
            </div>
            :
            <div className='listItem' key={id}>
                <li key={id}>{user}</li>
                <button className='removeFriend' onClick={removeFriend}>Remove a friend</button>
                </div>
            ));
        }
    }, [friends]);

    const handleLogout = () => {
        let userKey = sessionStorage.getItem('userKey');
        db.ref(`users/${userKey}/isLoggedIn`).set('false');
        props.history.push('/login');
    }

    const handleClickShareBtn = (e) => {
        setModalActive(true);
        setMovie(e.target.parentElement.textContent.replace('Share', ''));
    };

    return (
        sessionStorage.getItem('userKey') === null || sessionStorage.getItem('userKey') === undefined ? 
            <div className='roomErrorMessage'>
                <div>
                Please <NavLink to='/login'>login</NavLink> or <NavLink to='/register'>register</NavLink>
                </div>
            </div>
            :
                <div>
                    <div className='room'>
                        <p style={{fontSize: '1.2em'}}>Welcome to your private room, {
                        sessionStorage.getItem('nickname')
                        }!</p>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </div>
                    <div className='mainPersonalInfo'>
                        <div className='usersList'>
                            <h2>Check out other Users</h2>
                            <ul>{usersList}</ul>
                        </div>
                        <div className='friendsList'>
                            <h2>Your friends</h2>
                            <ul>
                                {sessionStorage.getItem('friendsList') && JSON.parse(sessionStorage.friendsList).length !== 0 ? JSON.parse(sessionStorage.friendsList).map((el, id) => <li key={id}>{el}</li>) : 'Please add some friends'}
                            </ul>
                        </div>
                        <div className='favourites'>
                            <h2>Your Favourites</h2>
                                <ul>{sessionStorage.getItem('sharedWith') ? <p><NavLink to='/shared'>See who you shared your favourites with</NavLink></p> : <></>}
                                    {!sessionStorage.getItem('favourites') ? 'No favourites' : JSON.parse(sessionStorage.favourites).map((el, id) => <li key={id}>{el}<button className='shareBtn' onClick={handleClickShareBtn}>Share</button></li>)}</ul>
                                <DropDownList movie={movie} active={modalActive} setActive={setModalActive}/>
                            </div>
                    </div>
                </div>
    )

}

export default PrivateRoom;