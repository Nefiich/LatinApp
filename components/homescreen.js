import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './home';
import ChangeName from './changename';


const Drawer = createDrawerNavigator();

const HomeScreen = () =>{
  return(
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{  
          headerShown: false,  
        }} 
      />
      <Drawer.Screen 
        name="ChangeName" 
        component={ChangeName} 
        options={{  
          headerShown: false,  
        }} 
      />
    </Drawer.Navigator>
  );
}

export default HomeScreen;