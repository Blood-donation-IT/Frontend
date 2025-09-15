import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Image } from "react-native";



const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#aaa',
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../images/home-active.png')
              : require('../images/home.png'); 
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../images/profile.png')//-active
              : require('../images/profile.png');
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
    </Tab.Navigator>
  );
}

