import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image, Modal, BackHandler } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function Question(props) {
    const email = useSelector(state => state.auth.email)
    const sessionID = useSelector(state=>state.session.id)
    const [answer,setAnswer] = useState("")
    const [gotAnswer, setGotAnswer] = useState(false)
    const [showModal,setShowModal] = useState(false)

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
        try {
            await AsyncStorage.setItem(
                props.id,
                "true"
            );
          } catch (error) {
              console.log(error)
          }
        setGotAnswer(true)
    }
    useEffect(() => {
        const checkGotAnswer = async()=>{
            try {
                const value = await AsyncStorage.getItem(props.id);
                if(value!==null){
                    setGotAnswer(true)
                }
              } catch (error) {
                  console.log(error)
              }
        }
        checkGotAnswer()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.position}>
                <Modal visible={showModal} transparent={true}
                onRequestClose={() => {setShowModal(false)}}>
                    <ImageViewer 
                        enableSwipeDown={true}
                        onCancel={()=>{
                            setShowModal(false)
                        }}
                        imageUrls={[{
                            url:"https://firebasestorage.googleapis.com/v0/b/sustainathon-350dd.appspot.com/o/ER%20diagram%20-%20Page%201.png?alt=media&token=4566f644-f051-4a24-bdd2-ce7e1b6b88c2"
                        }]}/>
                </Modal>
                {props.url!==null&&<View style={{width:'100%',height:300,marginBottom:20}} >
                    <TouchableOpacity onPress={()=>{
                            setShowModal(true)
                        }}>        
                        <Image    
                            style={{
                                width: '100%',
                                height:'100%',
                                resizeMode: 'contain'}}
                            source={{
                                uri:"https://firebasestorage.googleapis.com/v0/b/sustainathon-350dd.appspot.com/o/ER%20diagram%20-%20Page%201.png?alt=media&token=4566f644-f051-4a24-bdd2-ce7e1b6b88c2"
                            }}/>
                    </TouchableOpacity>
                </View>}
                
                <Text style={styles.question}>{props.question}</Text>
                {!gotAnswer&&<TextInput style={styles.answer} placeholder="answer" onChangeText={(input)=>{
                    setAnswer(input)
                }}></TextInput>}
                {!gotAnswer&&<TouchableOpacity onPress={submitAnswerHandler} style={{width:'100%',backgroundColor:'black',padding:5,marginTop:15,borderRadius:10,flexDirection:'column',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:16}}>Submit Answer</Text>
                </TouchableOpacity>}
                {gotAnswer&&<View style={{width:'100%',backgroundColor:'green',padding:5,marginTop:15,borderRadius:10,flexDirection:'column',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:16}}>Submitted</Text>
                </View>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        marginTop:10,
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
