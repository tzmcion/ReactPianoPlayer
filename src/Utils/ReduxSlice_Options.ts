/**
 * Redux Slice for options changing whole payload
 * LAST UPDATE: 11/07/2025
 */

import { createSlice } from "@reduxjs/toolkit";
import { handleDefaultValuesCheck } from "./Default";

export const counterSlice = createSlice({
    name: "Options",
    initialState: handleDefaultValuesCheck(),
    reducers:{
        changeOptionValue: (state, action) =>{
            return action.payload;
        }
    },

});

export const {changeOptionValue} = counterSlice.actions;


export default counterSlice.reducer