/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



import HomeScreen from './components/homescreen';
import Login from './components/login';

const Stack = createNativeStackNavigator();


const App = () => {

  const [flag, setFlag] = useState(false)

  const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if(value !== null) {
          console.log(value);
          console.log("Found!")
          setFlag(true)
        }
      } catch(e) {
        console.log("No username.")
        setFlag(false)
      }
    }

  useEffect(() => {
    getData();
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={flag ? 'HomeScreen' : 'Login'}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{  
            headerShown: false,  
          }} /> 
          <Stack.Screen name="Login" component={Login} options={{  
            headerShown: false,  
          }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
