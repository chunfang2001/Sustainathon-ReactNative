import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Header from '../UI/Header'
import { Rating } from 'react-native-ratings';
import { Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function Feedback() {
    const [feedback,setFeedback] = useState('')
    const [rating, setRating] = useState(2.5)
    const [submitted, setSubmitted] = useState(false)
    const sessionID = useSelector(state => state.session.id)

    const ratingHandler = (r)=>{
        setRating(r)
    }
    const feedbackHandler = async()=>{
        setFeedback('')
        // const response = await fetch("https://sustainathon.vercel.app/api/feedback/create",{
        //     method:"POST",
        //     body:JSON.stringify({
        //         "session_id": sessionID,
        //         "rating": rating,
        //         "text": feedback
        //     }),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        // const data = await response.json()
        // console.log(data)
        setSubmitted(true)
    }
    return (
        <View style={styles.container}>
            <Header>Feedback</Header>
            <View  style={styles.feedbackContainer}>
                <Text style={{fontSize:18}}>Feedback Form</Text>
                <Rating
                    showRating
                    style={{ paddingVertical: 10 }}
                    fractions={1}
                    onFinishRating= {(r)=>ratingHandler(r)}
                    startingValue={rating}
                />
                {submitted&&<View style={{fontSize:18,padding:10,borderWidth:1,borderColor:'#aaaaaa',width:'100%',borderRadius:10,marginTop:10,backgroundColor:'green',flexDirection:'column',alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{color:'white'}}>Submitted</Text>
                        <Fontisto name="heart-eyes" size={24} color="white" style={{marginLeft:20}}/>
                    </View> 
                </View>}
                {!submitted&&<TextInput value={feedback} multiline={true} style={{fontSize:18,padding:5,borderWidth:1,borderColor:'#aaaaaa',width:'100%',borderRadius:10,marginTop:10}} placeholder="feedback" 
                onChangeText={(input)=>{
                    setFeedback(input)
                }}></TextInput>}
                {!submitted&&<TouchableOpacity style={{margin:10,backgroundColor:'green',padding:8,borderRadius:10,elevation:10}} onPress={feedbackHandler}>
                    <Text style={{color:'white'}}>Submit Feedback</Text>
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flexDirection:'column',
        alignItems:'center'
    },
    feedbackContainer:{
        backgroundColor:'white',
        width:'95%',
        marginTop:10,
        padding:8,
        elevation:10,
        borderRadius:10,
        flexDirection:'column',
        alignItems:'center'
    }
})