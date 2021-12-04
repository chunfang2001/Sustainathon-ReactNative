import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name:'session',
    initialState:{
        id:'',
        startedAt:0,
        takingAtt:false,
    },
    reducers:{
        changeSession(state,action){
            state.id=action.payload.id
            state.startedAt = action.payload.startedAt
        },
        takingAttendance(state,action){
            state.takingAtt = action.payload.takingAtt
        }
    }
})

export default sessionSlice
export const sessionSliceAction = sessionSlice.actions