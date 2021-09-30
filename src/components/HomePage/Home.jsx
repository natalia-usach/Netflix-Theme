import React from 'react';
import img from './../../images/film_strip.png';

const Home = () => {
    return (
        <div className='homePage'>
            <div className='homeImg'>
                <img src={img} alt=''/>
            </div>
            <div className='about'>
                <h1>The world of movies</h1>
                <div style={{padding: '1em', fontSize: '1.5em'}}>
                    <p>Welcome to our brand new resource where you can have a look at the wide range of movies
                    and sort them according to a certain genre or rating.
                    You can also read a short description about each film.</p>
                    <p>There's also a possibility to enter your own room and add some films to your
                        preferences, add friends and share some preferences with them.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;