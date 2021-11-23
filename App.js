/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput
} from 'react-native';

const customData = require('./data/words.json');


const App = () => {

  const [input, setInput] = useState('');
  const [words, setWords] = useState();
  const [flag, setFlag] = useState(false)
  const [foundWords, setFoundWords] = useState([]);

  const didType = (prop) =>{
    setInput(prop)
    if(prop != ""){
      setFlag(true)
    }else{
      setFlag(false)
    }
  }

  const renderWords = () =>{
    return customData.words.map((data, index) =>{
      return <Text key={index} style={styles.word}>{data.word}</Text>
    })
  }

  const renderSerached = (found) =>{

    console.log("Found : ")
    console.log(found)


    return found.map((data, index) =>{
      console.log(data.word)
      return <Text key={index} style={styles.word}>{data.word}</Text>;
    })

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
      return renderSerached(found)

      
  }
  console.log("Flag : " + flag)
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TextInput 
            style={styles.inputField}
            placeholder="Unesite rijec"
            onChangeText={input => didType(input)}
            defaultValue={input}>
          </TextInput>
          <View style={styles.wordsContainer}>
            {flag ? findWord(input) : renderWords()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField:{
    borderColor: 'black',
    borderWidth:  1,
    borderRadius: 20,

    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  wordsContainer:{
    maxWidth: '80%'
  },
  word:{
    
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
    fontSize: 20
  }
});

export default App;
