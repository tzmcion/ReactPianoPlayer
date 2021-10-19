import React from 'react';
import Main from './Components/Main/Main';
import Tutorial from './Components/Tutorial/Tutorial';
import Header from './Components/Header/Header';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='main'>
    <Header />
    <Switch>
      <Route path='/tutorial' exact component={Tutorial} />
      <Route path='/' exact component={Main} />
    </Switch>
    </div>
  );
}

export default App;