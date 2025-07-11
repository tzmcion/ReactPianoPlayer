import { createSlice } from "@reduxjs/toolkit";
import { DefaultOptions } from "./Default";

export const counterSlice = createSlice({
    name: "Options",
    initialState: DefaultOptions,
    reducers:{
        changeOptionValue: (state, action) =>{
            console.log(state);
            console.log(action.payload);
            state = action.payload;
        }
    },

});

export const {changeOptionValue} = counterSlice.actions;


export default counterSlice.reducer