import React,{useState,useEffect} from 'react';
import Main from './Pages/Main/Main';
import Tutorial from './Pages/Tutorial/Tutorial';
import Header from './Components/Header/Header';
import Todo from './Pages/ToDo/ToDo';
import Play from './Pages/Play/Play';
import PlayRecorded from './Pages/Play/PlayRecorded';
import Record from './Pages/Record/Record';
import {Switch, Route} from 'react-router-dom';
import CountDownTimer from './Components/CountDownTimer/CountDownTimer';
import './App.css';

function App() {

  const [ac,setAc] = useState<any>(null);
  const [password,setPassword] = useState<string>('');
  const [allowed,setIsallowed] = useState<boolean>(false);

  useEffect(()=>{
    window.addEventListener('click',ac_add)
    window.addEventListener('drop',ac_add)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const ac_add = () =>{
    setAc(new AudioContext())
    window.removeEventListener('click',ac_add);
    window.removeEventListener('drop',ac_add);
  }

  const passwordChange = (e:any) =>{
      setPassword(e.target.value);
      if(e.target.value === 'bayo_yayo_03'){
        setIsallowed(true)
      }
  }

  return (
    <div className='main'>
      {!allowed && <div className='CheckPassword'>
        <h1>Piano Blocks App Closed Beta (testing)</h1>
        <h3>To access insert Password</h3>
        <input type="text" placeholder='Insert password' value={password} onChange={passwordChange} />
        <CountDownTimer />
      </div>}
      {allowed && <Header />}
      {allowed && <Switch>
        <Route path='/tutorial' exact component={Tutorial} />
        <Route path='/Todo' exact component={Todo} />
        <Route path='/Play' exact component={() => <Play ac={ac}/>} />
        <Route path='/Record' exact component={Record} />
        <Route path='/PlayRecorded' exact component={() =><PlayRecorded ac={ac} />} />
        <Route path='/' exact component={Main} />
      </Switch>}
    </div>
  );
}

export default App;