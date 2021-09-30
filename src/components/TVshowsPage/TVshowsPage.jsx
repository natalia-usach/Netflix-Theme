import React, { useContext, useState } from 'react';
import MainContext from '../../context';
import SortingOptions from './Sorting';
import TableOfShows from './Table';
import ScrollUpButton from "react-scroll-up-button";

const TVshows = () => {
    const value = useContext(MainContext);

    const [state, setState] = useState(value);
    // useEffect(() => {
    //     fetch('https://api.tvmaze.com/shows')
    //     .then(response => response.json())
    //     .then(data => {
    //         setState(data);
    //     });
    // }, []);

    const sortItemsRating = (e) => {
        if(e.target.value === 'Low-High') {
            setState([...state.sort((a, b) => a.rating.average - b.rating.average)]);
        } else if(e.target.value === 'High-Low'){
            setState([...state.sort((a, b) => b.rating.average - a.rating.average)]);
        }
    };

    const sortItemsGenres = (e) => {
        setState([...value.filter(item => item.genres.includes(e.target.value))]);
    };
    return (
        <div className='shows'>
            <SortingOptions sortItemsGenres={sortItemsGenres} sortItemsRating={sortItemsRating}/>
            <TableOfShows state={state}/>
            <ScrollUpButton/>
        </div>
    );
};

export default TVshows;