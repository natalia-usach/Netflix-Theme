import React from 'react';

const SortingOptions = (props) => {
    return (
        <div className='sorting'>
            <p style={{display: 'inline-block', margin: '0 .5em .5em .5em'}}>Sort by:</p>
            <select defaultValue='Genre' onChange={props.sortItemsGenres}>
                <option disabled selected>Genre</option>
                <option value='Action'>Action</option>
                <option value='Adventure'>Adventure</option>
                <option value='Anime'>Anime</option>
                <option value='Comedy'>Comedy</option>
                <option value='Crime'>Crime</option>
                <option value='Drama'>Drama</option>
                <option value='Espionage'>Espionage</option>
                <option value='Family'>Family</option>
                <option value='Fantasy'>Fantasy</option>
                <option value='History'>History</option>
                <option value='Horror'>Horror</option>
                <option value='Legal'>Legal</option>
                <option value='Medical'>Medical</option>
                <option value='Music'>Music</option>
                <option value='Mystery'>Mystery</option>
                <option value='Romance'>Romance</option>
                <option value='Science-Fiction'>Science-Fiction</option>
                <option value='Supernatural'>Supernatural</option>
                <option value='Thriller'>Thriller</option>
                <option value='Western'>Western</option>
            </select>
            <select onChange={props.sortItemsRating}>
                <option disabled selected>Rating</option>
                <option value='Low-High'>Low-High</option>
                <option value='High-Low'>High-Low</option>
            </select>
        </div>
    );
};

export default SortingOptions;

