import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import SessionChoice from './SessionChoice'
import { Divider } from 'react-native-elements';
import Header from '../UI/Header';
import { useSelector } from 'react-redux';
import SessionInput from './SessionInput';
import * as Notifications from 'expo-notifications';

let timer 
const noti_time = 5

export default function Session({ navigation: nav}) {
    const email = useSelector(state=>state.auth.email)
    const [updated,setUpdated] = useState(true)
    const [sessionList,setSessionList] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        clearTimeout(timer)
        setRefreshing(true);
        getSessionHandler()
        setTimeout(()=>{
            setRefreshing(false)
        },2000)

      }, []);

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
        data.session = data.session.filter((r)=>{
            return  r.end===false
        })
        setSessionList(data.session)
    }

    useEffect(()=>{
        if(updated){
            getSessionHandler()
            setUpdated(false)
        }
    },[updated])

    useEffect(()=>{
        const setNotification = async ()=>{
            await clearNotification()
            sessionList.map((s)=>{
                if((Date.parse(s.startedAt)-noti_time*60000)>(Date.now()+8*60*60*1000)){
                    let time = (Date.parse(s.startedAt)-noti_time*60000)-(Date.now()+8*60*60*1000)
                    let second = time/1000
                    schedulePushNotification(second)
                }
            })
            
        }
        setNotification()
    },[sessionList])

    async function schedulePushNotification(second) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Don't forget class",
            body: 'After 5 minutes your class will be started',
            data: { data: 'goes here' },
          },
          trigger: { seconds: second },
        });
    }

    async function clearNotification(){
        await Notifications.cancelAllScheduledNotificationsAsync()
    }
    return (
        <View style={styles.container}>
            <Header>Session</Header>
            <Divider orientation="horizontal" width={3}/>
            <SessionInput onUpdated={setUpdatedHandler}/>
            <ScrollView style={styles.scroll}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }>
                {sessionList.map((obj)=><SessionChoice key={obj.id} title={obj.class_code} nav={nav} id={obj.id} startedAt={Date.parse(obj.startedAt)}/>)}
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
        // backgroundColor:'#dacfe5'
        backgroundColor:'rgb(243, 244, 246)',
    },
    scroll:{
        padding:10,
        flex:1,
        width:'100%'
    }
})
