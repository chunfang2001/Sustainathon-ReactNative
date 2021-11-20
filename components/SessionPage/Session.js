import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native'
import SessionChoice from './SessionChoice'
import { Divider } from 'react-native-elements';
import Header from '../UI/Header';
import { useSelector } from 'react-redux';
import SessionInput from './SessionInput';

export default function Session({ navigation: nav}) {
    const email = useSelector(state=>state.auth.email)
    const [updated,setUpdated] = useState(true)
    const [sessionList,setSessionList] = useState([])

    const setUpdatedHandler = () =>{
        setUpdated(true)
    }

    const getSessionHandler = async()=>{
        const fetcher = await fetch("https://sustainathon.vercel.app/api/db/student/getStudentSession", {
                method: "POST",
                body: JSON.stringify({ 
                email: email, // student email
            }),
                headers: {
                "Content-Type": "application/json",
                },
        });
        const data = await fetcher.json()
        setSessionList(data.session)
    }

    useEffect(()=>{
        if(updated){
            getSessionHandler()
            setUpdated(false)
        }
    },[updated])

    return (
        <View style={styles.container}>
            <Header>Session</Header>
            <TouchableOpacity style={{backgroundColor:'white',opacity:0.5,width:'100%',flexDirection:'column',alignItems:'center',padding:3}} onPress={setUpdatedHandler}>
                <View>
                    <Text>Refresh</Text>
                </View>
            </TouchableOpacity>
            <Divider orientation="horizontal" width={3}/>
            <SessionInput onUpdated={setUpdatedHandler}/>
            <ScrollView style={styles.scroll}>
                {sessionList.map((obj)=><SessionChoice key={obj.id} title={obj.class_code} nav={nav} id={obj.id}/>)}
            </ScrollView>
            <Divider orientation="horizontal" width={3}/>
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
    scroll:{
        padding:10,
        flex:1,
        width:'100%'
    }
})
