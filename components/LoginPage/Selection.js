import React from 'react'
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'

export default function Selection({ navigation }) {
    const goLogin = ()=>{
        navigation.navigate("Login")
    }
    const goRegister = ()=>{
        navigation.navigate("Register")
    }
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.description}>The attendance app that monitor your attendance</Text>
            <View style={styles.logo}>
                <Text style={styles.logoTitle}>AttendanceAPP</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={goLogin}>
                <Text style={{fontSize:18}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton} onPress={goRegister}>
                <Text style={{fontSize:18, color:'white'}}>Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#dacfe5',
        backgroundColor:'rgb(243, 244, 246)',
        flexDirection:'column',
        alignItems:'center'
    },
    welcome:{
        fontSize:40,
        fontWeight:"bold",
        marginTop:40
    },
    description:{
        marginTop:20,
        fontSize:18,
        textAlign:'center',
        marginLeft:20,
        marginRight:20
    },
    logo:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        
    },
    logoTitle:{
        fontSize:30,
    },
    loginButton:{
        backgroundColor:'white',
        width:330,
        flexDirection:'column',
        alignItems:'center',
        padding:15,
        marginBottom:20,
        borderRadius:30,
        elevation:10,
    },
    signupButton:{
        // backgroundColor:'purple',
        backgroundColor:'black',
        width:330,
        flexDirection:'column',
        alignItems:'center',
        padding:15,
        marginBottom:20,
        borderRadius:30,
        elevation:10
    }
})