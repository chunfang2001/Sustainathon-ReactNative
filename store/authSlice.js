import { createSlice } from "@reduxjs/toolkit"

const init = {
    id:"",
    email:"",
    name:""
}

const authSlice = createSlice({
    name:'auth',
    initialState:init,
    reducers:{
        login(state,action){
            state.id = action.payload.id
            state.email = action.payload.email
            state.name = action.payload.name
        },
        logout(state){
            state.id = ""
            state.email = ""
            state.name = ""
        }
    }
})

export default authSlice
export const authSliceAction = authSlice.actions