// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../Theme/ThemeContext';

import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import SignInScreen from '../screens/SignInScreen';
import LogInScreen from '../screens/LogInScreen';
import Registration from '../screens/Registration';
import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import BookScreen from '../screens/BookScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Intro"
            component={IntroScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen 
            name="Home" 
            component={BottomTabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen 
            name="BookScreen" 
            component={BookScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
