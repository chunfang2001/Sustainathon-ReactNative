import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name:'session',
    initialState:{
        id:''
    },
    reducers:{
        changeSession(state,action){
            state.id=action.payload.id
        }
    }
})

export default sessionSlice
export const sessionSliceAction = sessionSlice.actions