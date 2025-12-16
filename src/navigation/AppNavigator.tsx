import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import Registration from '../screens/Registration';
import BottomTabNavigator from './BottomTabNavigator';
import BookScreen from '../screens/BookScreen';
import NotificationScreen from '../screens/NotificationScreen';

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
        <Stack.Screen 
          name="BookScreen" 
          component={BookScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="NotificationScreen" 
          component={NotificationScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
