import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import Quiz from '../components/ClassPage/Quiz';
import Chat from '../components/ClassPage/Chat';
import { MaterialIcons } from '@expo/vector-icons'; 
import Feedback from '../components/ClassPage/Feedback';
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import store from '../store/store';
import { updateLocation } from '../store/location-action';
import { useSelector } from 'react-redux';
import { sessionSliceAction } from '../store/sessionSlice';
import { useDispatch } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();
const LOCATION_TASK_NAME = "location-task";

export default function ClassPage({route}) {
    const dispatch = useDispatch()
    const { change } = route.params;
    const startedAt = useSelector(state => state.session.startedAt)
    const locationTrackingSetter = async()=>{
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 10*1000,
          distanceInterval: 0,
          foregroundService:{
            notificationTitle:'Attendance App',
            notificationBody:'Attendance App is tracking your location',
            notificationColor:'Red',
    
          },
          pausesUpdatesAutomatically:'false',
        })
        alert("Attendance is taking now")
      }

    const hasStarted = async()=>{
        const s = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TASK_NAME
        );
        return s
    }
    const startTrack = ()=>{
        return startedAt<=(Date.now()+8*60*60*1000)
    } 
    const stopTrack = async()=>{
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
    }
    useEffect(()=>{
        const process = async()=>{

            if(change){   
                const s = await hasStarted()
                if(s){
                    await stopTrack()
                }
                if(startTrack()){
                    await locationTrackingSetter()
                    dispatch(sessionSliceAction.takingAttendance({
                        takingAtt:true
                    }))
                }else{
                    dispatch(sessionSliceAction.takingAttendance({
                        takingAtt:false
                    }))
                }
                
            } 
        }
        process()
    },[])
    return (
        <>
        {/* <Text onPress={()=>{
            stopTrack()
            }}>b</Text> */}
        <Tab.Navigator
            initialRouteName="Class"
            inactiveColor="black"
            activeColor= 'rgb(37, 99, 150)'
            barStyle={{ backgroundColor: 'rgb(209, 213, 219)' }}>
                <Tab.Screen 
                    name="Quiz" 
                    component={Quiz} 
                    options={{
                        tabBarLabel: 'Quiz',
                        tabBarIcon : ()=>{
                            return <View>
                                <MaterialCommunityIcons name="file-question" size={20} color="black" />
                            </View>         
                        }
                    }}
                />
                <Tab.Screen 
                    name="Chat" 
                    component={Chat} 
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarIcon : ()=>{
                            return <View>
                                <Entypo name="chat" size={20} color="black" />
                            </View>         
                        }
                    }}
                />
                <Tab.Screen 
                    name="Feedback" 
                    component={Feedback} 
                    options={{
                        tabBarLabel: 'Feedback',
                        tabBarIcon : ()=>{
                            return <View>
                                <MaterialIcons name="feedback" size={20} color="black" />
                            </View>         
                        }
                    }}
                />
            </Tab.Navigator>
            </>
    )
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      alert(error)
      // Error occurred - check `error.message` for more details.
      return;
    }
    
    if (data) {
        const updateLocationHandler = async()=>{
            const { locations } = data; 
            let l1 = locations[0].coords.latitude
            let l2 = locations[0].coords.longitude
            const session_id = store.getState().session.id
            const email = store.getState().auth.email
            let sessionEnd = await sessionEndHandler(session_id,email)
            if(sessionEnd){
                await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
                store.dispatch(sessionSliceAction.takingAttendance({
                    takingAtt:false
                }))
            }else{
                store.dispatch(updateLocation(session_id,email,l1,l2))
            }
        }
        updateLocationHandler()
    }
  });

const sessionEndHandler = async(session_id,email)=>{
    const fetcher = await fetch("https://sustainathon.vercel.app/api/db/student/getStudentSession", {
            method: "POST",
            body: JSON.stringify({ 
            email: email, // student email
        }),
            headers: {
            "Content-Type": "application/json",
            },
    });
    let data = await fetcher.json()
    let sessionlist = data.session || []
    sessionlist = sessionlist.filter((r)=>{
        return  r.id===session_id
    })
    let end = sessionlist[0].end || false
    return end
}
