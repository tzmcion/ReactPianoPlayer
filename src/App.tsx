import React from 'react';
import Main from './Components/Main/Main';
import Tutorial from './Components/Tutorial/Tutorial';
import Header from './Components/Header/Header';
import Todo from './Components/ToDo/ToDo';
import Play from './Components/Play/Play';
import {Switch, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='main'>
    <Header />
    <Switch>
      <Route path='/tutorial' exact component={Tutorial} />
      <Route path='/Todo' exact component={Todo} />
      <Route path='/Play' exact component={Play} />
      <Route path='/' exact component={Main} />
    </Switch>
    </div>
  );
}

export default App;