import { NavLink } from "react-router-dom";

const SharedFavourites = () => {
    return (
        <div>
            <NavLink to='/room' style={{color: 'black', display: 'inline-block', padding: '1em', textDecoration: 'underline'}}>Back to My Room</NavLink>
            <div className='sharedFavourites'>
                <ul>{JSON.parse(sessionStorage.sharedWith).map((i, id) => <li key={id}>You shared <b><em>{Object.keys(i)}</em></b> with {Object.values(i).join(', ')}</li>)}</ul>
            </div>
        </div>
    );
};

export default SharedFavourites;