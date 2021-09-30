import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { Redirect } from 'react-router';
import { db } from '../../firebaseDB';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            errorMessage: '',
            users: {}
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

    enterAccount = (e) => {
        const {email, password} = this.state;
        e.preventDefault();
        db.ref('users').child(Object.entries(this.state.users).find(el => el[1].email === email)[0]).child('isLoggedIn').set('true');
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => this.setState({loggedIn: true}))
        .catch(error => this.setState({errorMessage: error.message.replace('Firebase:', '').replace(/(\s[(].*[)]\.)$/, '')}));
    };

    render() {
        return (
            <div>
            {
                this.state.loggedIn ? (<Redirect to={{
                    pathname: '/room',
                    state: {
                        'email': this.state.email
                    }
                }}/>) : 
                <div className='loginPage'>
                <h1>Login Page</h1>
                <form onSubmit={this.enterAccount}>
                    <input type='email' name='email' id='email' placeholder='Your email' onChange={this.handleChange}></input>
                    <input type='password' name='password' id='password' placeholder='Password' onChange={this.handleChange}></input>
                    <button type='submit'>Submit</button>
                    <div className='errorMessage'>{this.state.errorMessage}</div>
                </form>
            </div>
            }
            </div>
        );
    }
}

export default LoginPage;