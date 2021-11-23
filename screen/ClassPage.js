import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import Quiz from '../components/ClassPage/Quiz';
import Chat from '../components/ClassPage/Chat';
import { MaterialIcons } from '@expo/vector-icons'; 
import Feedback from '../components/ClassPage/Feedback';

const Tab = createMaterialBottomTabNavigator();

export default function ClassPage() {
    return (
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
    )
}
