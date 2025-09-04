/**
 * Redux Slice for options changing whole payload
 * LAST UPDATE: 11/07/2025
 */

import { createSlice } from "@reduxjs/toolkit";
import { DefaultOptions } from "./Default";

export const counterSlice = createSlice({
    name: "Options",
    initialState: DefaultOptions,
    reducers:{
        changeOptionValue: (state, action) =>{
            return action.payload;
        }
    },

});

export const {changeOptionValue} = counterSlice.actions;


export default counterSlice.reducer