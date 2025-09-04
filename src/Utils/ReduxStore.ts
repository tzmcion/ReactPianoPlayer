/**
 * Just a ReduxStore
 * LAST UPDATE: 11/07/2025
 */

import { configureStore } from '@reduxjs/toolkit';
import OptionsReducer from './ReduxSlice_Options'

export default configureStore({
    reducer:{
        options: OptionsReducer
    }
});
