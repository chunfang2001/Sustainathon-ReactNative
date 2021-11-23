import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

export default function Question(props) {
    const email = useSelector(state => state.auth.email)
    const sessionID = useSelector(state=>state.session.id)
    const [answer,setAnswer] = useState("")

    const submitAnswerHandler = async()=>{
        const fetcher = await fetch("https://sustainathon.vercel.app/api/db/student/answer", {
                method: "POST",
                body: JSON.stringify({ 
                email: email, // student email
                answer: answer, //student answer
                question_id: props.id,
                session_id: sessionID // need a created session_id
            }),
                headers: {
                "Content-Type": "application/json",
                },
        });
        const result = await fetcher.json();
        setAnswer("")
    }
    return (
        <View style={styles.container}>
            <View style={styles.position}>
                <Text style={styles.question}>{props.question}</Text>
                <TextInput style={styles.answer} placeholder="answer" onChangeText={(input)=>{
                    setAnswer(input)
                }}></TextInput>
                <TouchableOpacity onPress={submitAnswerHandler} style={{width:'100%',backgroundColor:'black',padding:5,marginTop:15,borderRadius:10,flexDirection:'column',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:16}}>Submit Answer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        marginTop:10
    },
    position:{
        backgroundColor:'white',
        padding:10,
        width:'95%'
    },
    question:{
        fontSize:17
    },
    answer:{
        borderWidth:1,
        borderColor:'#aaaaaa',
        marginTop:10,
        padding:5,
        fontSize:18
    }
})
