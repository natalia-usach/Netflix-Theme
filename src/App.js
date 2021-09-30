import React from 'react';
import './styles/App.css';
import './styles/MobileStyles.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import { Redirect, Route, Switch } from 'react-router';
import Home from './components/HomePage/Home';
import TVshows from './components/TVshowsPage/TVshowsPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Footer from './components/Footer/Footer';
import PrivateRoom from './components/PrivateRoom/PrivateRoom';
import SharedFavourites from './components/PrivateRoom/SharedFavourites';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home'/>
          </Route>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/tv-shows'component={TVshows}/>
          <Route exact path='/login' component={LoginPage}/>
          <Route exact path='/register' component={RegisterPage}/>
          <Route exact path='/room' render={(props) => <PrivateRoom {...props}/>}/>
          <Route exact path='/shared' component={SharedFavourites}/>
        </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
