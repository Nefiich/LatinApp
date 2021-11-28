import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    FlatList,
    BackHandler
}from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customData = require('../data/words.json');

const Home = ({navigation}) =>{



    const [input, setInput] = useState('');
    const [foundWords, setFoundWords] = useState([]);
    const [hide, setHide] = useState('flex');
    const [username, setUsername] = useState('');

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            setUsername(value)
            
          }
        } catch(e) {
          console.log("No username.")
          
        }
      }

    const inputEl = useRef(null);

    const didType = (prop) =>{
        setInput(prop)
        if(prop != ""){
          findWord(prop)
        }else{
          setFoundWords([])
        }
      }
    
      const findWord = (input) =>{
          console.log("Word : " + input)
          let found = [];
          customData.words.filter(word =>{ 
            let search = word.word.slice(0, input.length);
            if(input == search){
              found = [...found, word]
            }
            
          });
          setFoundWords(found)
      }

      const hideItems = (prop) =>{
          if(prop === true){
              setHide('none')
          }else{
              setHide('flex')
          }
      }

      function handleBackButtonClick() {
        setHide('flex')
        return true;
      }
    
      useEffect(() => {

        getData();

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
    return(
        <SafeAreaView style={styles.mainContainer}> 
            <View style={styles.headerContainer}>
                <Icon
                    name='ellipsis-h'
                    type='font-awesome-5'
                    iconStyle={styles.menuIcon}
                    onPress={() => navigation.openDrawer()} 
                />
                <Text style={styles.headerText}>LatinApp</Text>
                <Icon
                    name='search'
                    type='font-awesome-5'
                    iconStyle={styles.menuIcon}
                    onPress={() => inputEl.current.focus()} 
                />
            </View>
            <View style={[styles.headerWelcome, {display: hide}]}>
                <View style={styles.welcomeLeft}>
                    <Text style={styles.welcomeName}>Hi {username}!</Text>
                    <Text style={styles.welcomeBack}>Welcome back!</Text>
                </View>
                <View style={styles.welcomeRight}>
                    <View style={styles.welcomeAvatar}>
                        <Text style={styles.welcomeAvatarText}>{username.charAt(0)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.translatedContainer}>
                <FlatList
                 data={foundWords}
                 renderItem={({item}) => <Text style={styles.translatedWord}>{item.word}</Text>}
                />
            </View>
            <View style={styles.inputContainer}>
            <TextInput 
                style={styles.inputField}
                placeholder="Unesite rijec"
                onChangeText={input => didType(input)}
                defaultValue={input}
                onFocus={() => hideItems(true)}
                onBlur={() => hideItems(false)}
                ref={inputEl}
            />
            </View>
            <View style={[styles.footerContainer, {display: hide}]}>
                <Text style={styles.footerText}>Bosanski</Text>
                <View style={styles.circleContainer}>
                    <Icon
                        name='angle-right'
                        type='font-awesome-5'
                        iconStyle={styles.footerIcon}
                        onPress={() => console.log('hello')} 
                    />
                </View>
                <Text style={styles.footerText}>Latin</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    headerContainer:{
        
        display: 'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop: 20,
        height: 40
    },
    menuIcon:{
        fontSize: 30,
        marginRight: 20,
        marginLeft: 20,
        color: '#2d3436'
    },
    headerText:{
        fontSize: 25,
        height: 30,
        fontFamily: 'Roboto'
    },
    headerWelcome:{
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    welcomeLeft:{
        display:'flex',
        justifyContent:'center'
    },
    welcomeName:{
        fontSize: 20,
    },
    welcomeBack:{
        fontSize: 25,
        lineHeight: 27,
        fontWeight: '700',
        color: '#000'
    },
    welcomeRight:{
        display:'flex',
        justifyContent:'center'
    },
    welcomeAvatar:{
        width: 50,
        heigh: 50,
        borderRadius: 100,
        backgroundColor: '#0984e3',
        display: 'flex',
        alignItems:'center'
    },
    welcomeAvatarText:{
        fontSize: 25,
        padding: 10,
        color: '#fff',
        textTransform: 'uppercase'
    },
    scrollContainer:{
        height: 300
    },
    translatedContainer:{
        flex: 3,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        paddingBottom: 5,
        marginLeft: 20,
        marginRight: 20,

        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    translatedWord:{
        fontSize: 20
    },
    inputContainer:{
        flex: 0,
        display: 'flex',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10

    },
    inputField:{
        fontSize: 30,
        marginLeft: 20
    },
    footerContainer:{
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
    },
    footerText:{
        fontSize: 15,
        color: '#0984e3',
    },
    circleContainer:{
        width: 50,
        height: 50,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#2e2e2e',
        marginRight: 25
    },
    footerIcon:{
        fontSize: 30,
        color: '#f7f7f7',
    }

});

export default Home;