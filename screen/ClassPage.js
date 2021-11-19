import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import Quiz from '../components/ClassPage/Quiz';
import Chat from '../components/ClassPage/Chat';

const Tab = createMaterialBottomTabNavigator();

export default function ClassPage() {
    return (
        <Tab.Navigator
            initialRouteName="Class"
            inactiveColor="white"
            activeColor= '#edc7f1'
            barStyle={{ backgroundColor: '#694fad' }}>
                <Tab.Screen 
                    name="Quiz" 
                    component={Quiz} 
                    options={{
                        tabBarLabel: 'Quiz',
                        tabBarIcon : ()=>{
                            return <View>
                                <MaterialCommunityIcons name="file-question" size={20} color="white" />
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
                                <Entypo name="chat" size={20} color="white" />
                            </View>         
                        }
                    }}
                />
            </Tab.Navigator>
    )
}
