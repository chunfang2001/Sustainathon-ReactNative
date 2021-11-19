import React, { useRef } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'; 
import { Divider } from 'react-native-elements/dist/divider/Divider';

export default function Chat() {
    const scrollViewRef = useRef();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>ChatRoom</Text>
            </View>
            <Divider width={5}></Divider>
            <ScrollView style={styles.quizContainer} 
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello World</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
                <View style={styles.chatBox}>
                    <View style={styles.messageBox}>
                        <Text style= {styles.char}>Anonymous</Text>
                        <Text style={styles.message}>Hello Worldsssssssssssssssssssssssssssssssssssssssssss</Text>
                    </View>  
                </View>
            </ScrollView>
            <Divider width={5}></Divider>
            <View style={styles.chatInput}>
                <View style={styles.chatContainer}>
                    <TextInput placeholder="Type Something" style={styles.input}></TextInput>
                </View>
                <Ionicons name="send" size={24} color="purple" style={styles.sendButton}/>
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
