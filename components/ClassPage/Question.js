import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Question(props) {
    return (
        <View style={styles.container}>
            <View style={styles.position}>
                <Text style={styles.question}>{props.question}</Text>
                <TextInput style={styles.answer} placeholder="answer"></TextInput>
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
