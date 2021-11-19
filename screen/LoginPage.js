import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Selection from '../components/LoginPage/Selection';
import Login from '../components/LoginPage/Login';
import Register from '../components/LoginPage/Register';

const Stack = createStackNavigator();

export default function LoginPage() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent:true,
                    headerTitle:'',
                    gestureEnabled: true,
                }}>
                <Stack.Screen name="Home" component={Selection} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}
