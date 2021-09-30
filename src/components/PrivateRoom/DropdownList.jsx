import { useState } from "react/cjs/react.development";

const DropDownList = ({active, setActive, movie}) => {

    const [name, setName] = useState('');

    const handleOptionChange = (e) => {
        setName(e.target.value);
    };

    const sendToShared = (e) => {
        setActive(false);
        if(!sessionStorage.getItem('sharedWith')) {
            sessionStorage.setItem('sharedWith', JSON.stringify([{[movie]: [name]}]));
        } else if(JSON.parse(sessionStorage.sharedWith).filter(i => Object.keys(i).includes(movie)).length === 0) {
            let friendsSharedWith = JSON.parse(sessionStorage.sharedWith);
            friendsSharedWith.push({[movie]: [name]});
            sessionStorage.sharedWith = JSON.stringify(friendsSharedWith);
        } else {
            let friendsSharedWith = JSON.parse(sessionStorage.sharedWith);
            if(friendsSharedWith.filter(i => Object.keys(i).includes(movie))[0][movie].includes(name)) {
                sessionStorage.sharedWith = JSON.stringify(friendsSharedWith);
            } else {
                friendsSharedWith.filter(i => Object.keys(i).includes(movie))[0][movie].push(name);
                sessionStorage.sharedWith = JSON.stringify(friendsSharedWith);
            }
        }
    };

    return (
        <div className={active ? 'dropdownWrapper active' : 'dropdownWrapper'} onClick={() => setActive(false)}>
            <div className={active ? 'dropdownList active' : 'dropdownList'} onClick={(e) => e.stopPropagation()}>
                {!sessionStorage.friendsList || JSON.parse(sessionStorage.friendsList).length === 0 ? <p>No friends</p> :
                <div>
                    <select onChange={handleOptionChange}>
                        <option disabled selected>Share with a friend:</option>
                        {JSON.parse(sessionStorage.friendsList).map((el, id) => 
                        <option key={id}>{el}</option>)}
                    </select>
                    <button onClick={sendToShared}>Share</button>
                </div>
                }
            </div>
        </div>
    );
}

export default DropDownList;