import React, { Component } from 'react';
import { ImageBackground, Picker, TouchableHighlight, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Dimensions } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LottieView from 'lottie-react-native';

// DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);



export default class ThanksMsg extends Component {
  constructor(props) {
    super(props)

    this.state = {
        lawyerSearchingColor: 'white',
        lawyerAccessColor: 'white',

    }

    //REFS
        this.lawyerSearching = React.createRef();

  }

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  }

  render() {
    return (
      <ImageBackground source={require('../images/thanksMsg.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'stretch',resizeMode: "cover", justifyContent: "center"}}>

      <View style={{flex: 1, flexDirection: 'column', padding: '5%', paddingTop: windowHeightPercentUnit*5, backgroundColor: "transparent"}}>

        <View style={{flex: windowHeightPercentUnit, backgroundColor: "transparent"}}>
            <Text style={styles.welcome}>¡HEMOS RECIBIDO TUS DATOS!</Text>
        </View>

        <View style={{/*display:(Platform.OS === 'ios')?"flex":"none",*/  flex: windowHeightPercentUnit*4, alignItems: "center", justifyContent: "center" }}>
                <LottieView
                    ref={animation => {
                      this.animation = animation;
                    }}
                    style={{
                      //width: 400,
                      //height: 300,
                      backgroundColor: 'transparent'//,
                    }}
                    source={require('../assetsLottie/45140-app-update2.json')} // Problema el require no funciona en adroid
                  // OR find more Lottie files @ https://lottiefiles.com/featured
                  // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                  />
        </View>

        <View style={{flex: windowHeightPercentUnit, flexDirection: 'column', backgroundColor: "transparent"}}>
            <Text style={styles.instructions}>En lo pronto, uno de nuestros colaboradores te contactará, luego de revisar tus antecedentes</Text>
            <Text style={[styles.instructions,{fontWeight: 'bold', fontSize:windowHeightPercentUnit*3}]}>Gracias por elegir Legalis!</Text>

        </View>



        <View style={{flex: windowHeightPercentUnit*1, paddingTop: windowHeightPercentUnit*2, backgroundColor: "transparent"}}>
           {/* <Button color={Platform.OS === 'ios'?"white":"#747A87"} title="VOLVER AL INICIO" onPress={() => {this.props.navigation.navigate('Home')}}/>*/}
            <TouchableHighlight onPress={() => {this.props.navigation.navigate('Home')}} onShowUnderlay={() =>{this.setState({lawyerAccessColor: 'black' })}} onHideUnderlay={() =>{this.setState({lawyerAccessColor: 'white' })}} activeOpacity={0.2} underlayColor="#747A87">
                <View style={styles.button}>
                    <Text ref={this.lawyerSearching} style={[styles.buttonText,{ color: this.state.lawyerAccessColor}]}>Volver al Inicio</Text>
                </View>
            </TouchableHighlight>
        </View>
      </View>
    </ImageBackground >


    );
  }
}

const styles = StyleSheet.create({
  instructions: {
  textAlign: 'center',
  padding: 10,
  paddingTop: 0,
  color: "#4170f9",
  fontSize: windowHeightPercentUnit*2,

  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontWeight: 'bold',
      fontSize: windowHeightPercentUnit*4,
      zIndex:1,
    },
  button: {
    backgroundColor: '#2ec5f9',
    padding: windowHeightPercentUnit*2,
    borderRadius: 10,
    },
  buttonText: {
    textAlign: 'center',
    fontSize: windowHeightPercentUnit*3,
    fontWeight: 'bold'
    },
  img: {
    width: windowHeightPercentUnit*10,
    height:200
    },
});
