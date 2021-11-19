import React,{ useEffect } from 'react'
import { View, StyleSheet, Text} from 'react-native';
import LoginPage from './screen/LoginPage';
import { useSelector } from 'react-redux';
import AllPage from './screen/AllPage';
import { useDispatch } from 'react-redux';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { locationSliceAction } from './store/locationSlice';

const LOCATION_TASK_NAME = "background-location-task";

export default function Page() {
    const dispatch = useDispatch()
    const requestPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          BackHandler.exitApp();
          return;
        }
        const location = await Location.getCurrentPositionAsync()
        dispatch(locationSliceAction.update({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }))
      };
    
      useEffect(()=>{
        requestPermission()
      },[])
    const isSignIn = useSelector(state=>state.auth.auth)
    const af = async()=>{
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 5000,
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
            {!isSignIn&&<LoginPage/>}
            {isSignIn&&<AllPage></AllPage>}
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
      console.log(locations[0].coords.latitude) 
      console.log(locations[0].coords.longitude)
    }
  });