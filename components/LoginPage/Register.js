import React,{ useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { loginAction } from '../../store/login-action';
import { useDispatch } from 'react-redux';

export default function Register({navigation}) {
    const dispatch = useDispatch()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmedPassword,setConfirmedPassword] = useState('')

    const registerHandler = async()=> {
        if(!email.includes("@")){
            alert("Invalid email")
            return 
        }
        else if(password!==confirmedPassword){
            alert("Password is not the same!!!")
            return 
        }
        
        dispatch(loginAction(email.trim(),name,password))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={{marginTop:10, fontSize:17}}>Register now to get your attendance</Text>
            <View style={styles.box}>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <Feather name="user" size={24} color="white" />
                    </View>
                    <TextInput placeholder='username' style={styles.inputText} onChangeText={(input)=>{
                        setName(input)
                    }}></TextInput>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <AntDesign name="mail" size={24} color="white" />
                    </View>
                    <TextInput placeholder='email' style={styles.inputText} onChangeText={(input)=>{
                        setEmail(input)
                    }}></TextInput>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <Foundation name="key" size={24} color="white" />
                    </View>
                    <TextInput placeholder='password' style={styles.inputText} secureTextEntry={true} onChangeText={(input)=>{
                        setPassword(input)
                    }}></TextInput>
                </View>
                <View style={styles.input}>
                    <View style={styles.inputIcon}>
                        <Foundation name="key" size={24} color="white" />
                    </View>
                    <TextInput placeholder='Confirmed password' style={styles.inputText} secureTextEntry={true} onChangeText={(input)=>{
                        setConfirmedPassword(input)
                    }}></TextInput>
                </View>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={{marginTop:10, fontSize:17,color:'blue',textDecorationLine: 'underline',}} onPress={()=>{
                        navigation.navigate('Login')
                    }}>Login now!</Text>
                </View>
                <View style={styles.position}>
                    <TouchableOpacity style={styles.button} onPress={registerHandler}>
                        <Text style={{color:'white',fontSize:18}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1 ,
        // backgroundColor:'#dacfe5',
        backgroundColor:'rgb(243, 244, 246)',
        flexDirection:'column',
        alignItems:'center',
    },
    title:{
        fontSize:35,
        fontWeight:"bold",
        marginTop:80
    },
    box:{
        marginTop:50,
        width:'90%',
    },
    input:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        marginBottom:30,
    },
    inputIcon:{
        // backgroundColor:'purple',
        backgroundColor:'black',
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
        // backgroundColor:'purple',
        backgroundColor:'black',
        padding:8,
        borderRadius:10,
        paddingLeft:15,
        paddingRight:15,
        elevation:10
    }
})
