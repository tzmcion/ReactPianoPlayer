import {Action, createStore} from 'redux';

const initialState = 0;

const Reducer = (state:any = initialState,action:Action) => {
    switch(action.type){
        case 'perfect':
            return state  + 100;
        default:
            return state;
    }
}

const store = createStore(Reducer);

export default store;