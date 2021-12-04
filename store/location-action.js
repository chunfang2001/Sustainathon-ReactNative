import { locationSliceAction } from "./locationSlice"

export const updateLocation = (session_id,email,latitude,longitude)=>{
    return async(dispatch)=>{
        const response = await fetch("https://sustainathon.vercel.app/api/db/location/create",{
            method:"POST",
            body:JSON.stringify({
                "longitude":`${longitude}`,
                "lattitude":`${latitude}`,
                "email":`${email}`,
                "session_id":`${session_id}`
            }),
            headers: {
                "Content-Type": "application/json",
                },
        })

        dispatch(locationSliceAction.update({
            latitude: latitude,
            longitude: longitude
        }))
    }
}