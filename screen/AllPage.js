import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SessionPage from './SessionPage';
import ClassPage from './ClassPage';

const Stack = createStackNavigator();

export default function AllPage() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent:true,
                    headerTitle:'',
                    gestureEnabled: true,
                    headerTintColor: 'white'
                }}>
                <Stack.Screen name="Sessions" component={SessionPage} />
                <Stack.Screen name='Class' component = {ClassPage}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}
