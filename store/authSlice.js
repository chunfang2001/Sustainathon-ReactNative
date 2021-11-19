import { createSlice } from "@reduxjs/toolkit"

const init = {
    auth : false
}

const authSlice = createSlice({
    name:'auth',
    initialState:init,
    reducers:{
        login(state){
            state.auth = true
        },
        logout(state){
            state.auth = false
        }
    }
})

export default authSlice
export const authSliceAction = authSlice.actions