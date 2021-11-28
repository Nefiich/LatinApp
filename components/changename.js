import React, {useEffect} from 'react';
import {
    SafeAreaView,
    Text
}from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ChangeName = ({navigation}) =>{

    const redirect = async () => {
        try {
          await AsyncStorage.removeItem('@storage_Key')
        } catch(e) {
          console.log(e);
        }
        navigation.navigate('Login')
        console.log('Done.')
      }

    useEffect(() => {
        redirect();
    }, [])

    return(
        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>Redirecting...</Text>
        </SafeAreaView>
    );
}

export default ChangeName;