import {Action, createStore} from 'redux';

const initialState = 0;

const Reducer = (state:any = initialState,action:Action) => {
    switch(action.type){
        case 'perfect':
            return state  + 100;
        case 'good':
            return state + 50;
        case 'ok':
            return state + 20;
        case 'meh':
            return state + 10;
        case 'cheat':
            return state - 1000;
        default:
            return state;
    }
}

const store = createStore(Reducer);

export default store;