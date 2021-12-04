import React,{ useEffect } from 'react'
import { View, StyleSheet, Text, BackHandler,Platform} from 'react-native';
import LoginPage from './screen/LoginPage';
import { useSelector } from 'react-redux';
import AllPage from './screen/AllPage';
import { useDispatch } from 'react-redux';
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications';
import { locationSliceAction } from './store/locationSlice';

const LOCATION_TASK_NAME = "background-location-task";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let l1 = 0
let l2 = 0
export default function Page() {
    const dispatch = useDispatch()
    const requestPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          BackHandler.exitApp()
          return;
        }
        const location = await Location.getCurrentPositionAsync()
        l1 = location.coords.latitude
        l2 = location.coords.longitude
        dispatch(locationSliceAction.update({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }))
    };
    async function registerForPushNotificationsAsync() {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if(finalStatus==='granted'){
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }   
    useEffect(()=>{
      requestPermission()
      registerForPushNotificationsAsync()   
    },[])

    const id = useSelector(state=>state.auth.id)
    const gotID = id===""?false:true

    return (
        <View style={styles.container}>
            {!gotID&&<LoginPage/>}
            {gotID&&<AllPage></AllPage>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
    }
})

