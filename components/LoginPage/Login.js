import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { authSliceAction } from '../../store/authSlice';

export default function Login({navigation}) {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOGIN</Text>
            <Text style={{marginTop:10, fontSize:17}}>Login now to get your attendance</Text>
            <View style={styles.box}>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <Feather name="user" size={24} color="white" />
                    </View>
                    <TextInput placeholder='username' style={styles.inputText}></TextInput>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <Feather name="key" size={24} color="white" />
                    </View>
                    <TextInput placeholder='password' style={styles.inputText} secureTextEntry={true}></TextInput>
                </View>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={{marginTop:10, fontSize:17,color:'blue',textDecorationLine: 'underline',}} onPress={()=>{
                        navigation.navigate('Register')
                    }}>Click here to register now!</Text>
                </View>
                <View style={styles.position}>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        dispatch(authSliceAction.login())
                    }}>
                        <Text style={{color:'white',fontSize:18}}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1 ,
        backgroundColor:'#dacfe5',
        flexDirection:'column',
        alignItems:'center',
    },
    title:{
        fontSize:35,
        fontWeight:"bold",
        marginTop:100
    },
    box:{
        marginTop:100,
        width:'90%',
    },
    input:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        marginBottom:30,
    },
    inputIcon:{
        backgroundColor:'purple',
        padding:10,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    inputText:{
        backgroundColor:'white',
        flex:1,
        padding:9,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        fontSize:18
    },
    position:{
        alignItems:'center',
        flexDirection:'column',
        marginTop:30
    },
    button:{
        backgroundColor:'purple',
        padding:8,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        elevation:10
    }
})
