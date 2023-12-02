import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Token : localStorage.getItem("Token") ? localStorage.getItem("Token") : null
}


const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        addTokenInLocalStorage:(state,action)=>{
            state.Token = action.payload;
        },
        removeTokenfromState:(state)=>{
            state.Token = null;
        }
    }
})

export const {addTokenInLocalStorage,removeTokenfromState} = userSlice.actions;
export default userSlice.reducer;