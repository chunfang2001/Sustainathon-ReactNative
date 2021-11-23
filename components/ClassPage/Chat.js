import React, { useEffect, useRef,useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import { Divider } from 'react-native-elements/dist/divider/Divider';
import useSWR from 'swr';
import { useSelector } from 'react-redux';


export default function Chat() {
    const sessionID = useSelector(state => state.session.id)
    const [text,setText] = useState("")
    const [data,setData] = useState([])

    const createMessageHandler = async()=>{
        const fetcher = await fetch("https://sustainathon.vercel.app/api/db/message/create", {
                method: "POST",
                body: JSON.stringify({ 
                sender: "Anonymous", // put anonymous or student email
                text: text, // the message
                session_id: sessionID // need a created session_id
            }),
                headers: {
                "Content-Type": "application/json",
                },
        });
        const result = await fetcher.json();
        sendRequest()
        setText("")
    }
    const scrollViewRef = useRef();

    const sendRequest = async()=>{
        const response = await fetch(`https://sustainathon.vercel.app/api/db/message/get/?session_id=${sessionID}`)
        const dt = await response.json()
        setData(dt.chat)
    }

    let timer 
    useEffect(()=>{
        sendRequest()
        timer = setInterval(() => {
            sendRequest()
        }, 10000);
        return ()=>{
            clearInterval(timer)
        }
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ChatRoom</Text>
            </View>
            <Divider width={5}></Divider>
            <ScrollView style={styles.quizContainer} 
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {data?.map((msg)=>{
                    return (
                    <View style={styles.chatBox} key={msg.id}>
                        <View style={styles.messageBox}>
                            <Text style= {styles.char}>{msg.sender}</Text>
                            <Text style={styles.message}>{msg.text}</Text>
                        </View>  
                    </View>)
                })}
            </ScrollView>
            <Divider width={5}></Divider>
            <View style={styles.chatInput}>
                <View style={styles.chatContainer}>
                    <TextInput placeholder="Type Something" value={text} style={styles.input} onChangeText={(input)=>{
                        setText(input)
                    }}></TextInput>
                </View>
                <TouchableOpacity onPress={createMessageHandler}>
                    <Ionicons name="send" size={24} color="black" style={styles.sendButton}/>
                </TouchableOpacity>    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
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
        marginTop:10,
        width:'100%',
        flexDirection:'column',
    },
    chatInput:{
        width:'95%',
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        padding:10,
        borderRadius:10,
        borderColor:'#aaaaaa',
        backgroundColor:'white'
    },
    chatContainer:{
        width:'80%',
        marginLeft:10,
    },
    sendButton:{
        marginRight:10
    },
    input:{
        fontSize:18,
        overflow:'hidden'
    },
    messageBox:{
        width:'90%',
        borderColor:'#aaaaaa',
        borderWidth:1,
        marginBottom:10,
        backgroundColor:'white',
        padding:10,
        borderRadius:5
    },
    chatBox:{
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
    },
    message:{
        fontSize:18
    },
    char:{
        marginLeft:5,
        color:'#aaaaaa',
        fontStyle:'italic',
        marginBottom:3
    }
})
