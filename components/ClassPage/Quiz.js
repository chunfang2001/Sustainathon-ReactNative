import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import Question from './Question'

let timer
const second = 5*60000
export default function Quiz() {
    const [questionList,setQuestionList] = useState([])
    const id = useSelector(state => state.session.id)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        clearTimeout(timer)
        setRefreshing(true);
        fetchQues();
        setTimeout(()=>{
            setRefreshing(false)
        },2000)

      }, []);
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
        result.question = result.question.filter((r)=>{
            return  Date.parse(r.createdAt)+second >= Date.now()
        })
        setQuestionList(result.question)
    }
    useEffect(()=>{
        fetchQues()
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Quiz</Text>
            </View>
            {questionList.length===0&&<View style={{width:'100%',flexDirection:'column',alignItems:'center',padding:8,marginTop:10}}>
                <Text style={{fontSize:18}}>Not quizzes yet</Text>
            </View>}
            <ScrollView style={styles.quizContainer}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }>
                {questionList.map((ques)=><Question question={ques.question} key={ques.id} id={ques.id}></Question>)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        // backgroundColor:'purple',
        backgroundColor:'black',
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
