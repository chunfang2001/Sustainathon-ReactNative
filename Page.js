import React,{ useEffect } from 'react'
import { View, StyleSheet, Text, BackHandler,Platform} from 'react-native';
import LoginPage from './screen/LoginPage';
import { useSelector } from 'react-redux';
import AllPage from './screen/AllPage';
import { useDispatch } from 'react-redux';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from 'expo-notifications';
import store from './store/store';
import { updateLocation } from './store/location-action';
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
    const af = async()=>{
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 10*1000,
          distanceInterval: 0,
          foregroundService:{
            notificationTitle:'Attendance App',
            notificationBody:'Attendance App is working now',
            notificationColor:'Red',
    
          },
          pausesUpdatesAutomatically:'false',
        })
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TASK_NAME
        );
        console.log('tracking started?', hasStarted);
      }
    
      const stopaf = ()=>{
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      }
    return (
        <View style={styles.container}>
            <Text onPress={af}>a</Text>
            <Text onPress={stopaf}>b</Text>
            {/* <Text onPress={schedulePushNotification}>c</Text> */}
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

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      alert(error)
      // Error occurred - check `error.message` for more details.
      return;
    }
    
    if (data) {
      const { locations } = data; 
      // console.log(locations[0].coords.latitude - l1) 
      l1 = locations[0].coords.latitude
      // console.log(locations[0].coords.longitude - l2)
      l2 = locations[0].coords.longitude
      const session_id = store.getState().session.id
      const email = store.getState().auth.email
      store.dispatch(updateLocation(session_id,email,l1,l2))
    }
  });