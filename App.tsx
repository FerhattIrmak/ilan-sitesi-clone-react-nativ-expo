import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/ShowcaseScreen';
import TabNavigator from './src/navigation/TabNavigator';
import Toast from 'react-native-toast-message';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={SplashScreen} />
        <Stack.Screen name='Home' component={TabNavigator} />
        <Stack.Screen name='Register' component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    <Toast/>


    </>
  );
}
