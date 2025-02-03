import React from 'react';
import Main from './Pages/Main/Main';
import Tutorial from './Pages/Tutorial/Tutorial';
import Header from './Components/Header/Header';
import Info from './Pages/ToDo/ToDo';
import Play from './Pages/Play/Play';
import PlayRecorded from './Pages/Play/PlayRecorded';
import Record from './Pages/Record/Record';
import {Routes as Switch, Route} from 'react-router-dom';
import './App.css';

function App() {

  return (
    <div className='main'>
      <Header />
      <Switch>
        <Route path='/tutorial' element={<Tutorial/>} />
        <Route path='/Info' element={<Info/>} />
        <Route path='/Play' element={<Play/>} />
        <Route path='/Record' element={<Record />} />
        <Route path='/PlayRecorded' element={<PlayRecorded />} />
        <Route path='/' element={<Main />} />
      </Switch>
    </div>
  );
}

export default App;