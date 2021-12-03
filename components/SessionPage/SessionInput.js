import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

export default function SessionInput(props) {
    const [sessionID,setSessionId] = useState("")
    const email = useSelector(state=>state.auth.email)
    const joinSessionHandler = async()=>{
        if(sessionID===""){
            alert("Session ID cannot be blank")
            return 
        }else{
            const fetcher = await fetch("https://sustainathon.vercel.app/api/db/student/join", {
                    method: "POST",
                    body: JSON.stringify({ 
                    email: email, // student email
                    session_id: sessionID // need a created session_id // in this case use ckw6aj4py000707mcyy2lmy1i
                }),
                    headers: {
                    "Content-Type": "application/json",
                    },
            });
            const result = await fetcher.json();
            setSessionId("")
            props.onUpdated()
        }
    }
    return (
        <View style={{backgroundColor:'white', width:'95%',borderRadius:10,padding:8,flexDirection:'column',alignItems:'center',elevation:10, marginTop:10}}>
            <Text style={{fontSize:17}}>Join Session Using code</Text>
            <View style={{flexDirection:'row',alignItems:'center', width:'100%',marginTop:5}}>
                <TextInput style={{borderWidth:1,borderColor:'#aaaaaa',flex:5, overflow:'hidden',padding:5}} placeholder="Session ID" onChangeText={(input)=>{
                    setSessionId(input)
                }} value={sessionID}></TextInput>
                <TouchableOpacity style={{backgroundColor:"black",padding:5,marginLeft:10,borderRadius:3,flex:2,alignItems:'center'}} onPress={joinSessionHandler}>
                    <Text style={{color:'white',fontSize:18}}>Join</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}
