import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "../Theme/ThemeContext";

import SplashScreen from "../screens/web/home/SplashScreen";
import IntroScreen from "../screens/web/home/IntroScreen";
import SignInScreen from "../screens/web/auth/SignInScreen";
import LogInScreen from "../screens/web/auth/LogInScreen";
import Registration from "../screens/web/donation/Registration";
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationScreen from "../screens/web/home/NotificationScreen";

import SettingsScreen from "../screens/web/profile/SettingsScreen";
import EditProfileScreen from "../screens/web/profile/EditProfileScreen";
import TestScreen from "../screens/web/home/TestScreen";
import BookScreen from "../screens/web/donation/BookScreen";
import ForgetScreen from "../screens/web/auth/ForgetScreen";
import { RootStackParamList } from "./types";
import ResetPasswordScreen from "../screens/web/auth/ResetPasswordScreen";
import CreateNewPasswordScreen from "../screens/web/auth/Createpassword";
import DonationHistoryScreen from "../screens/web/profile/DonationHistoryScreen";
import DetailedInformationScreen from "../screens/web/profile/DetailedInformationScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetScreen"
            component={ForgetScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateNewPasswordScreen"
            component={CreateNewPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LogIn"
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookScreen"
            component={BookScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DonationHistory"
            component={DonationHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailedInformation"
            component={DetailedInformationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
