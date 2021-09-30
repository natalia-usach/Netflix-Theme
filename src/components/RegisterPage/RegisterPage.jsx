import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { Redirect } from 'react-router';
import { db } from '../../firebaseDB';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            hasAccount: false,
            users: {},
            errorMessage: ''
        };
    }

    componentDidMount() {
        const users = db.ref('users');
        users.on('value', (elem) => {
            this.setState({users: {...elem.val()}});
        });
    }

    handleChange = ({target: {value, id}}) => {
        this.setState({
            [id]: value
        });
    };

    createAccount = (e) => {
        e.preventDefault();
        const {email, password, nickname} = this.state;
        db.ref('users').push({'nickname': nickname, 'email': email, 'isLoggedIn': 'true', 'friends': ['none']});
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            db.ref('users').on('value', el => {
                sessionStorage.setItem('userKey', Object.entries({...el.val()}).filter(e => e[1].email === email)[0][0])
            });
            sessionStorage.setItem('nickname', nickname);
            this.setState({hasAccount: true});
            if(!sessionStorage.getItem('usersList')) {
                sessionStorage.setItem('usersList', JSON.stringify([nickname]));
            } else {
                let usersList = JSON.parse(sessionStorage.usersList);
                usersList.push(nickname);
                sessionStorage.usersList = JSON.stringify(usersList);
            }
        })
        .catch(error => this.setState({errorMessage: error.message.replace('Firebase:', '').replace(/(\s[(].*[)]\.)$/, '')}));
    };

    render() {
        return (
            <div>
                {
                    this.state.hasAccount
                    ?
                    (<Redirect to={{
                        pathname: '/room',
                        state: {
                            'email': this.state.email,
                            'users': this.state.usersList
                        }
                    }}/>)
                    :
                    (<div className='registerPage'>
                        <h1>Register Page</h1>
                        <p style={{textAlign: 'center', marginTop: '1em'}}>Please fill in all the fields below</p>
                        <form onSubmit={this.createAccount}>
                            <input type='text' id='nickname' placeholder='Your nickname' onChange={this.handleChange}/>
                            <input type='email' name='email' id='email' placeholder='Your email' onChange={this.handleChange}></input>
                            <input type='password' name='password' id='password' placeholder='Password' onChange={this.handleChange}></input>
                            <button type='submit'>Submit</button>
                            <div className='errorMessage'>{this.state.errorMessage}</div>
                        </form>
                    </div>)
                }
            </div>
        );
    }
}

export default RegisterPage;