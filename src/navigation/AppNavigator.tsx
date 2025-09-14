import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen 
          name="Home" 
          component={BottomTabNavigator} 
          options={{ headerShown: false }} // приховаємо заголовок стека для табів
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
