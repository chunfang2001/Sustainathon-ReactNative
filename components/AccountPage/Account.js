import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { useDispatch } from 'react-redux'
import { authSliceAction } from '../../store/authSlice'

export default function Account() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        dispatch(authSliceAction.logout())
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={{flex:1}}></View>
                <Text style={styles.name}>TAN CHUN FANG</Text>
                <Text style={styles.email}>chunfang2001@gmail.com</Text>
            </View>
            <Divider width={5}></Divider>
            <View style={{flex:1}}></View>
            <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
                <Text style={{fontSize:20}}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'#dacfe5'
    },
    profile:{
        backgroundColor:'purple',
        height:'25%',
        width:'100%',
        elevation:20
    },
    name:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        margin:10
    },
    email:{
        color:'white',
        fontSize:18,
        marginBottom:10,
        marginLeft:10
    },
    logout:{
        backgroundColor:'white',
        width:'90%',
        borderRadius:20,
        marginBottom:20,
        padding:10,
        elevation:20,
        flexDirection:'column',
        alignItems:'center',
    }
})