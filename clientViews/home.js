import React, { Component } from 'react';
import { ImageBackground, Dimensions, Platform, Alert, TouchableHighlight, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage'


import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

// DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);

export class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
      lawyerSearchingColor: '#4170f9',
      lawyerAccessColor: '#4170f9',
    };
    this.showAsyncStorageData = this.showAsyncStorageData.bind(this);

    //REFS
    this.lawyerSearching = React.createRef();

  }

   componentDidMount(){

    this.showAsyncStorageData(this.props.navigation)

   }

   showAsyncStorageData = async (navigation) =>{
                 try{
                     let name = AsyncStorage.getItem("lawyerSession")
                     .then((value) =>{
                     if(value!==null){

                           this.props.navigation.navigate('LawyerProfile')
                       }
                       else
                       {
                       }
                     })
                 }
                 catch(err){
                     console.log(err)
                     }
                 }


  render() {
    return (

         <ImageBackground source={require('../images/home.png')} style={{resizeMode: "cover", justifyContent: "center",  flex:windowHeight*1, flexDirection: 'column', paddingTop: windowHeightPercentUnit*30, paddingBottom: windowHeightPercentUnit*30 }}>
            <View style={{flex:windowHeight*2}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:'transparent'}}>
                    <Image resizeMode="cover" source={require('../images/logo.png')}  style={styles.img}/>
                </View>
            </View>
            <View style={{flex:windowHeight*1, backgroundColor: "transparent",alignItems: 'stretch', padding: '10%'}}>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('Query')}} onShowUnderlay={() =>{this.setState({lawyerSearchingColor: 'black'})}} onHideUnderlay={() =>{this.setState({lawyerSearchingColor: '#4170f9'})}} activeOpacity={0.2} underlayColor="#747A87">
                        <View style={styles.button}>
                          <Text ref={this.lawyerSearching} style={[styles.buttonText,{ color: this.state.lawyerSearchingColor}]}>BUSCO ABOGADO</Text>
                        </View>
                </TouchableHighlight>
                {/*<Button color={Platform.OS === 'ios'?"white":"#747A87"} title="Ya soy cliente" onPress={() => this.props.navigation.navigate('ClientRegister')}/>
                <Text>  </Text>*/}
                <Text>  </Text>
                <TouchableHighlight onPress={()=>{this.props.navigation.navigate('LawyerRegister')}} onShowUnderlay={() =>{this.setState({lawyerAccessColor: 'black'})}} onHideUnderlay={() =>{this.setState({lawyerAccessColor: '#4170f9'})}} activeOpacity={0.2} underlayColor="#747A87">
                    <View style={styles.button}>
                        <Text ref={this.lawyerSearching} style={[styles.buttonText,{ color: this.state.lawyerAccessColor}]}>SOY ABOGADO</Text>
                    </View>
                </TouchableHighlight>
            </View>
         </ImageBackground >

    );
  }
}


const styles = StyleSheet.create({
   img: {
   height:windowHeightPercentUnit*45,
   width: '100%',

   },
  welcome: {
    textAlign: 'center',
    margin: 0,
    color: "white",
    fontSize: 40,
  },
  button: {
  backgroundColor: 'white',
  padding: windowHeightPercentUnit*3,
  borderRadius: 10,
  },
   buttonText: {
    textAlign: 'center',
    fontSize: windowHeightPercentUnit*2,
    fontWeight: 'bold'

    },

});

