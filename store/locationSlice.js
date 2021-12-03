import { createSlice } from "@reduxjs/toolkit";

const init = {
    latitude: 0,
    longitude: 0,
}

const locationSlice = createSlice({
    name:'location',
    initialState: init,
    reducers:{
        update(state,action){
            state.latitude = action.payload.latitude
            state.longitude = action.payload.longitude
        },
    }
})

export default locationSlice
export const locationSliceAction = locationSlice.actions