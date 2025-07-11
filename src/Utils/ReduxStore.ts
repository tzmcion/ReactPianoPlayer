import { configureStore } from '@reduxjs/toolkit';
import OptionsReducer from './ReduxSlice_Options'

export default configureStore({
    reducer:{
        options: OptionsReducer
    }
});
