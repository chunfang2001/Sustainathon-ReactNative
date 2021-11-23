import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authSliceAction } from '../../store/authSlice'

export default function Account() {
    const email = useSelector(state=>state.auth.email)
    const name = useSelector(state=>state.auth.name)
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        dispatch(authSliceAction.logout())
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={{flex:1}}></View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.email}>{email}</Text>
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
        // backgroundColor:'#dacfe5'
        backgroundColor:'rgb(243, 244, 246)'
    },
    profile:{
        // backgroundColor:'purple',
        backgroundColor:'black',
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