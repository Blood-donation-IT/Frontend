// AppNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "../Theme/ThemeContext";

import SplashScreen from "../screens/mobile/home/SplashScreen";
import IntroScreen from "../screens/mobile/home/IntroScreen";
import SignInScreen from "../screens/mobile/auth/SignInScreen";
import LogInScreen from "../screens/mobile/auth/LogInScreen";
import Registration from "../screens/mobile/donation/Registration";
import BottomTabNavigator from "./BottomTabNavigator";
import NotificationScreen from "../screens/mobile/home/NotificationScreen";

import SettingsScreen from "../screens/web/profile/SettingsScreen";
import EditProfileScreen from "../screens/mobile/profile/EditProfileScreen";
import TestScreen from "../screens/mobile/home/TestScreen";
import BookScreen from "../screens/mobile/donation/BookScreen";
import ForgetScreen from "../screens/mobile/auth/ForgetScreen";
import { RootStackParamList } from "./types";
import ResetPasswordScreen from "../screens/mobile/auth/ResetPasswordScreen";
import CreateNewPasswordScreen from "../screens/mobile/auth/Createpassword";
import DonationHistoryScreen from "../screens/web/profile/DonationHistoryScreen";
import DetailedInformationScreen from "../screens/web/profile/DetailedInformationScreen";
import FAQScreen from "../screens/web/profile/FAQScreen";
import AboutUsScreen from "../screens/web/profile/AboutUsScreen";
import SupportScreen from "../screens/web/profile/SupportScreen";

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
          <Stack.Screen
            name="FAQ"
            component={FAQScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Support"
            component={SupportScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}