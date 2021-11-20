import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import Question from './Question'

export default function Quiz() {
    const [questionList,setQuestionList] = useState([])
    const id = useSelector(state => state.session.id)
    const fetchQues = async()=>{
        const fetcher = await fetch("https://sustainathon.vercel.app/api/db/question/get", {
                method: "POST",
                body: JSON.stringify({ 
                session_id: id // need a created session_id
            }),
                headers: {
                "Content-Type": "application/json",
                },
        });
        const result = await fetcher.json();
        setQuestionList(result.question)
        console.log(result)
    }
    useEffect(()=>{
        fetchQues()
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quiz</Text>
            </View>
            <ScrollView style={styles.quizContainer}>
                
                {questionList.map((ques)=><Question question={ques.question} key={ques.id}></Question>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        backgroundColor:'purple',
        width:'100%',
        alignItems:'center',
        flexDirection:'column',
        padding:10
    },
    title:{
        fontSize:25,
        color:'white',
        fontWeight:'bold'
    },
    quizContainer:{
        flex:1,
    }
})
