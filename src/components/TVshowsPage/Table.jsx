import React from 'react';
import parse from 'html-react-parser';
import { useState } from 'react/cjs/react.development';

const TableOfShows = (props) => {

    const [favouriteShows, setFavourites] = useState([]);

    const addFavourite = (e) => {
        if(!sessionStorage.getItem('favourites')) {
            sessionStorage.setItem('favourites', JSON.stringify([e.target.parentElement.parentElement.previousSibling.textContent]));
        } else {
            let favourites = JSON.parse(sessionStorage.getItem('favourites'));
            if(!favourites.includes(e.target.parentElement.parentElement.previousSibling.textContent)) {
                favourites.push(e.target.parentElement.parentElement.previousSibling.textContent);
                sessionStorage.favourites = JSON.stringify(favourites);
            } else {
                sessionStorage.favourites = JSON.stringify(favourites.filter(item => item !== e.target.parentElement.parentElement.previousSibling.textContent));
            }
    }
        setFavourites([...favouriteShows, e.target.parentElement.parentElement.previousSibling.textContent]);
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Description</th>
                <th>Genres</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody>
                {sessionStorage.getItem('userKey') ?
                sessionStorage.getItem('favourites') ?
                props.state.map(item => sessionStorage.getItem('favourites').includes(item.name) ? <tr key={item.id}>
                    <td><img className='filmImg' src={item.image.medium} alt=''/></td>
                    <td className={'center' + ' title'}>{item.name}</td>
                    <td className='filmSummary'><p className='filmDescription'>{parse(item.summary)}</p><div className='starWrapper'><span className='starDisabled' onClick={addFavourite}>&#x2605;</span><span className='text'>Remove from favourites</span></div></td>
                    <td className='center'>{item.genres.map(genre => <p>{genre}</p>)}</td>
                    <td className='center'>{item.rating.average}</td>
                </tr> : <tr key={item.id}>
                    <td><img className='filmImg' src={item.image.medium} alt=''/></td>
                    <td className={'center' + ' title'}>{item.name}</td>
                    <td className='filmSummary'><p className='filmDescription'>{parse(item.summary)}</p><div className='starWrapper'><span className='starEnabled' onClick={addFavourite}>&#x2605;</span><span className='text'>Add to favourites</span></div></td>
                    <td className='center'>{item.genres.map(genre => <p>{genre}</p>)}</td>
                    <td className='center'>{item.rating.average}</td>
                </tr>) 
                : props.state.map(item => <tr key={item.id}>
                    <td><img className='filmImg' src={item.image.medium} alt=''/></td>
                    <td className={'center' + ' title'}>{item.name}</td>
                    <td className='filmSummary'><p className='filmDescription'>{parse(item.summary)}</p><div className='starWrapper'><span className='starEnabled' onClick={addFavourite}>&#x2605;</span><span className='text'>Add to favourites</span></div></td>
                    <td className='center'>{item.genres.map(genre => <p>{genre}</p>)}</td>
                    <td className='center'>{item.rating.average}</td>
                </tr>)
                : props.state.map(item => <tr key={item.id}>
                    <td><img className='filmImg' 
                    src={item.image.medium} alt=''/></td>
                    <td className={'center' + ' title'}>{item.name}</td>
                    <td className='filmSummary'><p className='filmDescription'>{parse(item.summary)}</p></td>
                    <td className='center'>{item.genres.map(genre => <p>{genre}</p>)}</td>
                    <td className='center'>{item.rating.average}</td>
                </tr>)}
            </tbody>
        </table>
    );
}

export default TableOfShows;