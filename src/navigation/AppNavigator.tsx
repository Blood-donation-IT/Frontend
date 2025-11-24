import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import Registration from '../screens/Registration';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';

import BookScreen from '../screens/BookScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen 
          name="Home" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen 
          name="BookScreen" 
          component={BookScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
