import React, {Component, useState, useEffect, useRef}  from 'react';
import { TouchableHighlight, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {PanResponder, Animated, Dimensions} from 'react-native';
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';

import { useSelector, useDispatch } from 'react-redux';

    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/6);


export default function VideoComponent({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [skip, setSkip] = useState(false);
    const [avExpoShouldPlay, setAvExpoShouldPlay] = useState(false);


    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    //USE REF'S
    const videoLoader = useRef(null);

    useEffect(()=>{
    videoLoader.current.play();
    setTimeout(()=>{ setSkip(true);}, 52000)
    if(skip){navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);}
    },[])

     useEffect(()=>{
        setTimeout(()=>{
        if(skip)
            {
                navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);
            }
        })

     },[skip])


    return (
        <>
        <LottieView
           ref={videoLoader}
           style={{
           paddingTop: '20%',
           flex:1,
           backgroundColor: 'white',
           display: (!avExpoShouldPlay)?'flex':'none'
           }}
           source={require("../assetsLottie/please-wait2.json")}
        />
        <Video
           source={require('../assets/legalis-usuario.mp4')}
           rate={1.0}
           onReadyForDisplay={()=>{
           console.log("ready!");
           setAvExpoShouldPlay(true);

           }}
           volume={2.0}
           isMuted={false}
           shouldPlay={avExpoShouldPlay}
           resizeMode="cover"
           style={{flex:1, backgroundColor: 'red', display: (avExpoShouldPlay)?'flex':'none'}}
         />
         <TouchableHighlight onPress={()=>{ (!skip)?navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]):console.log("skiped already!")}} style={{display: (avExpoShouldPlay)?'flex':'none', backgroundColor:'#3b2960', borderRadius:10, margin:10, marginBottom:30, padding: 30}}>
            <Text style={{fontWeight: "bold", textAlign: "center", fontSize: windowHeightPercentUnit*2, color:'white'}}>
                SALTAR VIDEO
            </Text>
         </TouchableHighlight>
             {/*<TouchableOpacity onPress={()=>{ (!skip)?navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]):console.log("skiped already!")}} style={{display: (avExpoShouldPlay)?'flex':'none', backgroundColor: "#747A87", height: 70, color: 'white', alignItems: "center"}} color="white" >
                <Text></Text>
                <Text style={{fontSize:20, color: "white"}}>SALTAR VIDEO</Text>
             </TouchableOpacity>*/}
         </>

    );
}
//43048-video-camera
const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    padding: 20,
    color: "white",
    fontSize: 35,

  },
  instructions: {
      color: 'white',
      backgroundColor: "#4170f9",
      borderColor: '#fff',
      fontSize:25,
      textAlign: "justify",
      padding: 20

    },
});

