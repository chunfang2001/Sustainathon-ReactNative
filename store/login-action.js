import { authSliceAction } from "./authSlice";

export const loginAction = (email,name, password)=>{
    return async (dispatch) =>{
        const fetcher = await fetch("https://sustainathon.vercel.app/api/db/student/login", {
                method: "POST",
                body: JSON.stringify({ 
                email: email,
                name: name, //optional
                password: password // use bcrypt to hash
            }),
                headers: {
                "Content-Type": "application/json",
                },
        });
        const result = await fetcher.json();
        const data = {
            id:result.student.id ||"",
            email:result.student.email||"",
            name:result.student.name||""
        }
        dispatch(authSliceAction.login(data))
    }
    
}

