import React from 'react'
import Session from '../components/SessionPage/Session'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import Account from '../components/AccountPage/Account';
import { MaterialIcons } from '@expo/vector-icons'; 
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import MapViewing from '../components/MapPage/MapViewing';


const Tab = createMaterialBottomTabNavigator();

export default function SessionPage() {
    return (
        <>
            <Tab.Navigator
            initialRouteName="SessionPage"
            inactiveColor="white"
            activeColor= '#edc7f1'
            barStyle={{ backgroundColor: '#694fad' }}>
                <Tab.Screen 
                    name="Session" 
                    component={Session} 
                    options={{
                        tabBarLabel: 'Session',
                        tabBarIcon : ()=>{
                            return <Entypo name="time-slot" size={20} color="white"/>
                        },
                        
                    }}
                />
                <Tab.Screen 
                    name="Map" 
                    component={MapViewing} 
                    options={{
                        tabBarLabel: 'Map',
                        tabBarIcon : ()=>{
                            return <View >
                                <Feather name="map-pin" size={20} color="white" />
                            </View>         
                        }
                    }}
                />
                <Tab.Screen 
                    name="Account" 
                    component={Account} 
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon : ()=>{
                            return <View >
                                <MaterialIcons name="account-circle" size={20} color="white" />
                            </View>         
                        }
                    }}
                />
            </Tab.Navigator>
        </>
    )
}
