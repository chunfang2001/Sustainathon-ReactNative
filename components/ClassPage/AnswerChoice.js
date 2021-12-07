import React from 'react'
import { Text,TouchableOpacity, StyleSheet } from 'react-native'

export default function AnswerChoice(props) {
    const clickHandler = (answer)=>{
        props.setAnswerHandler(answer)
    }
    return (
        <TouchableOpacity style={props.clicked?styles.chosen:styles.container} onPress={()=>{
            clickHandler(props.answer)
        }}>
            <Text style={props.clicked?styles.chosenText:styles.notChosenText}>{props.choice}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:5,
        marginBottom:4,
        borderWidth:1,
        padding:8
    },
    chosen:{
        backgroundColor:'green',
        borderRadius:5,
        marginBottom:4,
        borderWidth:1,
        padding:8,
        borderWidth:0
    },
    chosenText:{
        color:'white',
    },
    notChosenText:{
        color:'black',
    }
})
