import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    ImageBackground
}from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) =>{

    const [username, setUsername] = useState();

    const setUsernameToStorage = async () =>{
        try {
            await AsyncStorage.setItem('@storage_Key', username);
            navigation.navigate('HomeScreen', {screen: 'Home'})
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <SafeAreaView>
            <ImageBackground source={require('../assets/bgimage.jpg')} resizeMode="cover">
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.headingText}>Translate Text</Text>
                        <Text style={styles.headingBottomText}>Sa Latinsog na Bosanski Keme mi</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Unesite ime"
                            placeholderTextColor="#fff"
                            onChangeText={username => setUsername(username)}
                            defaultValue={username}
                        />
                    
                    
                        <Button
                            style={styles.button}
                            title="Dalje"
                            onPress={() => setUsernameToStorage()}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding:20,

    },
    textContainer:{
        flex:1,
        justifyContent: 'flex-start'
    },
    actionsContainer:{
        flex:1,
        justifyContent: 'flex-end'
    },
    headingText:{
        fontSize: 40,
        fontWeight: '700',
        color: '#fff'
    },
    headingBottomText:{
        fontSize: 15,
        color: '#fff',
    },
    textInput: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        marginBottom: 20,
        color: '#fff'
    },
    button:{
        
    }
})
export default Login;