import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableHighlight, ImageBackground, Picker, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Switch } from 'react-native';
import { CheckBox as iosCheckbox, ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RNPickerSelect from 'react-native-picker-select'; // DOCUMENTATION https://www.npmjs.com/package/react-native-picker-select
import DropDownPicker from 'react-native-dropdown-picker'; // DOCUMENTATION https://www.npmjs.com/package/react-native-dropdown-picker

import { useSelector, useDispatch } from 'react-redux';
import {dispatchListOfCases, dispatchSelectCase} from '../redux/dispatcher.js'
import {Animated, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LottieView from 'lottie-react-native';


import CheckBox from '@react-native-community/checkbox'; //DOCS:  https://github.com/react-native-checkbox/react-native-checkbox

let arr = [1,2,3]
    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);

export default function LawyerLogin({navigation}) {

    //REDUX STATE
   const store = useSelector(state => state.userData);
   const dispatch = useDispatch();

   //ASYNC STORAGE
   const save = async (data) =>{
    try{
        await AsyncStorage.setItem("lawyerSession", JSON.stringify(data))
    } catch(err){console.log(err)}
   }

   const showAsyncStorageData = async (navigation) =>{
                        try{
                            let name = AsyncStorage.getItem("lawyerSession")
                            .then((value) =>{
                            if(value!==null){
                                  navigation.navigate('LawyerProfile')
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


   const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
   const [ingresaTextAnimation, setIngresaTextAnimation] = useState(new Animated.Value(windowHeightPercentUnit*4));
   const [ingresaTextBoolean, setIngresaTextBoolean] = useState(true);

   const [flex, setFlex] = useState(0);
   const [animate, setAnimate] = useState(new Animated.Value(0));
   const [letEnterBoolean, setLetEnterBoolean] = useState(false);
   const [account, setAccount] = useState("");

   const [registerName, setNewRegisterName] = useState("");
   const [registerNameAnimation, setNewRegisterNameAnimation] = useState(new Animated.Value(0));
   const [registerMail, setNewRegisterMail] = useState("");
   const [registerMailAnimation, setNewRegisterMailAnimation] = useState(new Animated.Value(0));
   const [registerPhone, setNewRegisterPhone] = useState("");
   const [registerPhoneAnimation, setNewRegisterPhoneAnimation] = useState(new Animated.Value(0));

   const [registerPassword, setNewRegisterPassword] = useState("");
   const [registerPasswordAnimation, setNewRegisterPasswordAnimation] = useState(new Animated.Value(0));
   const [toggleCheckBox, setToggleCheckBox] = useState(false)
   const [isEnabled, setIsEnabled] = useState(false);
   const [registerRut, setNewRegisterRut] = useState("");
   const [registerRutAnimation, setNewRegisterRutAnimation] = useState(new Animated.Value(0));

   const [registerField, setNewRegisterField] = useState("DIVORCIOS");
   const [registerFieldAnimation, setNewRegisterFieldAnimation] = useState(new Animated.Value(0));
   const [registerBank, setNewRegisterBank] = useState("");
   const [registerBankAnimation, setNewRegisterBankAnimation] = useState(new Animated.Value(0));
   const [registerAccountType, setNewRegisterAccountType] = useState("");
   const [registerAccount, setNewRegisterAccount] = useState("");
   const [registerAccountAnimation, setNewRegisterAccountAnimation] = useState(new Animated.Value(0));

   const [sendingRegistration, setSendingRegistration] = useState("none");
   const [verifyingLogIn, setverifyingLogIn] = useState("none");

   const [inputColorValidation, setInputColorValidation] = useState({registerName: "white", registerMail: "white", registerPhone: "white",
     registerPassword: "white", registerRut: "white", registerField: "white", registerBank: "white" , registerAccount: "white"  });

   const [rut, enterRut] = useState("");
   const [rutAnimation, setrutAnimation] = useState(new Animated.Value(0));
   const [password, enterPassword] = useState("");
   const [passwordAnimation, setPasswordAnimation] = useState(new Animated.Value(0));
   const [toggleCheckBoxLogin, setToggleCheckBoxLogin] = useState(false)
   const [isEnabledLogin, setIsEnabledLogin] = useState(false);
   const [displayLoaderOne, setDisplayLoaderOne] = useState("none");
   const [displayLoaderTwo, setDisplayLoaderTwo] = useState("none");
   const [displayErrorOne, setDisplayErrorOne] = useState("none");
   const [displayErrorTwo, setDisplayErrorTwo] = useState("none");
   const [lottieAnimationFile, setLottieAnimationFile] = useState("../assetsLottie/error-response.json");
   const [flexDropDownPickerAnimation, setFlexDropDownPickerAnimation] = useState(new Animated.Value(2));

   const [lawyerAccessColor, setLawyerAccessColor] = useState("white");





   const registerCheckbox =  (Platform.OS !== 'ios')?<CheckBox
                                          tintColors={{true:"#27F900", false: "white" }}
                                          disabled={false}
                                          value={toggleCheckBox}
                                          onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                          />:<Switch
                                                     trackColor={{ false: "white", true: "#27F900" }}
                                                     thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                                     ios_backgroundColor="#3e3e3e"
                                                     onValueChange={(value)=> setToggleCheckBox(value)}
                                                     value={toggleCheckBox}
                                                     style={{marginTop:10}}
                                                   />

    const loginCheckbox =(Platform.OS !== 'ios')?<CheckBox
                                                tintColors={{true:"#27F900", false: "white" }}
                                                disabled={false}
                                                value={toggleCheckBoxLogin}
                                                onValueChange={(newValue) => setToggleCheckBoxLogin(newValue)}
                                                 />:<Switch
                                                       trackColor={{ false: "white", true: "#27F900" }}
                                                       thumbColor={isEnabledLogin ? "#f5dd4b" : "#f4f3f4"}
                                                       ios_backgroundColor="#3e3e3e"
                                                       onValueChange={(value)=> setToggleCheckBoxLogin(value)}
                                                       value={toggleCheckBoxLogin}
                                                       style={{marginLeft: windowWidthPercentUnit, marginTop: 10}}
                                                       />

    //USE REF'S
    const loaderOne = useRef(null);
    const loaderTwo = useRef(null);
    const errorOne = useRef(null);
    const errorTwo = useRef(null);
    const lawyerSearching = useRef(null);

    useEffect(()=>{
        console.disableYellowBox = true;
        let animationLoop;

        if(ingresaTextBoolean){


        Animated.loop(Animated.sequence([
                        	Animated.timing(ingresaTextAnimation, {
                        		toValue: windowHeightPercentUnit*4,
                        		duration: 2000
                        	}),
                        	Animated.timing(ingresaTextAnimation, {
                        		toValue: windowHeightPercentUnit*4.4,
                        		duration: 500
                        	}),
                            Animated.timing(ingresaTextAnimation, {
                        		toValue: windowHeightPercentUnit*4,
                        		duration: 200
                        	}),
                        	Animated.timing(ingresaTextAnimation, {
                                toValue: windowHeightPercentUnit*4.4,
                                duration: 500
                            }),
                            Animated.timing(ingresaTextAnimation, {
                                toValue: windowHeightPercentUnit*4,
                                duration: 200
                            }),
                        ])).start()
                 }
                 else{
                    ingresaTextAnimation.stopAnimation(()=> {
                        console.log("paramos el loop")
                    })
                 }
    },[ingresaTextBoolean])

   useEffect(()=>{// ONLY IF THE USERDATA ARRIVES TO THE STORE THE NAVIGATOR IS UPDATED

       showAsyncStorageData(navigation)

       loaderTwo.current.play()
       //errorTwo.current.play()

       if( letEnterBoolean ){

            let arrayOfCasesAndQueries = [];

                           fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.lawyers_id)//WE GET ALL LAWYER'S CASES
                                 .then(response =>{return response.json()})
                                 .then((data)=>{
                                  arrayOfCasesAndQueries.push(...data.resp)

                                 fetch("http://patoexer.pythonanywhere.com/userByLawyers/5")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER
                                                                     .then(response =>{return response.json()})
                                                                     .then((data)=>{
                                                                     arrayOfCasesAndQueries.push(...data.resp)

                                                                     dispatchListOfCases(arrayOfCasesAndQueries)
                                                                     setverifyingLogIn("none")
                                                                     setDisplayLoaderTwo("none")
                                                                     navigation.navigate('LawyerProfile')
                                                                     })
                                                                     .catch(error => console.log(error))

                                 })
                                 .catch(error => console.log(error))

         }
   },[letEnterBoolean])

  const register =()=>{

       switch(0){
       case registerName.length:
        setInputColorValidation({...inputColorValidation, registerName: "#FBC1C1" })
        Animated.sequence([
        	Animated.timing(registerNameAnimation, {
        		toValue: 10,
        		duration: 50
        	}),
        	Animated.timing(registerNameAnimation, {
        		toValue: -10,
        		duration: 50
        	}),
            Animated.timing(registerNameAnimation, {
        		toValue: 10,
        		duration: 50
        	}),
        	Animated.timing(registerNameAnimation, {
        		toValue: 0,
        		duration: 50
        	})
        ]).start()
        break;
       case registerMail.length:
        setInputColorValidation({...inputColorValidation, registerMail: "#FBC1C1" })
                Animated.sequence([
                	Animated.timing(registerMailAnimation, {
                		toValue: 10,
                		duration: 50
                	}),
                	Animated.timing(registerMailAnimation, {
                		toValue: -10,
                		duration: 50
                	}),
                    Animated.timing(registerMailAnimation, {
                		toValue: 10,
                		duration: 50
                	}),
                	Animated.timing(registerMailAnimation, {
                		toValue: 0,
                		duration: 50
                	})
                ]).start()
           break;

       case registerPhone.length:
       setInputColorValidation({...inputColorValidation, registerPhone: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerPhoneAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerPhoneAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerPhoneAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerPhoneAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;

       case registerRut.length:
       setInputColorValidation({...inputColorValidation, registerRut: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerRutAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerRutAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerRutAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerRutAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;
       case registerField.length:
       setInputColorValidation({...inputColorValidation, registerField: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerFieldAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerFieldAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerFieldAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerFieldAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;
       case registerBank.length:
       setInputColorValidation({...inputColorValidation, registerBank: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerBankAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerBankAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerBankAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerBankAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;
       case registerAccount.length:
       setInputColorValidation({...inputColorValidation, registerAccount: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerAccountAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerAccountAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerAccountAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerAccountAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;
        case registerPassword.length:
               setInputColorValidation({...inputColorValidation, registerPassword: "#FBC1C1" })
               Animated.sequence([
               	Animated.timing(registerPasswordAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerPasswordAnimation, {
               		toValue: -10,
               		duration: 50
               	}),
                   Animated.timing(registerPasswordAnimation, {
               		toValue: 10,
               		duration: 50
               	}),
               	Animated.timing(registerPasswordAnimation, {
               		toValue: 0,
               		duration: 50
               	})
               ]).start()
           break;
           default:
                 setSendingRegistration("flex")
                 setDisplayLoaderOne("flex")
                 setLetEnterBoolean(false)


                 let today = new Date();
                 let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

                 //POST TO LAWYERS/

                 fetch("http://patoexer.pythonanywhere.com/lawyer/" + registerRut)
                 .then(response =>{return response.json()})
                 .then((data)=>{

                   if(data.lawyers_rut!=registerRut){

                           let lawyerData = { // VALIDACION DE NUMERO O TEXTO HACER
                                   "lawyers_name": registerName,
                                    "lawyers_password": registerPassword,
                                    "lawyers_email": registerMail,
                                    "lawyers_rut": registerRut,
                                    "lawyers_phone": registerPhone,
                                    "lawyers_field": registerField,
                                    "lawyers_title": " ",
                                    "lawyers_file_speciality": " " ,
                                    "lawyers_bank": registerBank,
                                    "lawyers_account": " ",
                                    "lawyers_bank_number": registerAccount,
                                    "approved": 0
                               }

                               //console.log("*******************"  +JSON.stringify(lawyerData))

                               let options = {
                                           method: 'POST',
                                           body: JSON.stringify(lawyerData),
                                           headers: {'Content-Type': 'application/json'}};

                           fetch("http://patoexer.pythonanywhere.com/lawyer/1", options)
                                       .then((response)=>{ return response.json()})
                                       .then((data)=> { console.log("paso")
                                           setSendingRegistration("none")
                                           setDisplayLoaderOne("none")
                                           navigation.navigate('ThanksMsg')
                                       })
                                       .catch(error => {
                                       console.log('error aca')
                                       setDisplayLoaderOne("none")
                                       errorOne.current.play()
                                       setDisplayErrorOne("flex")

                                       })

                   } else{
                              console.log("YA ESTAS REGISTRADO!!")
                   }

                 })
                 .catch((error) => console.log(error))



       }


  }

  const showRegisterView = () => {
    if(!registerBtnDisplayed){
       setIngresaTextBoolean(false)
       setRegisterBtnDisplayed(true)//this.setState({registerBtnDisplayed: true})
        Animated.timing(animate, {toValue: 3, duration: 500}).start()
    }
    else if(registerBtnDisplayed){
       setIngresaTextBoolean(true)
       setRegisterBtnDisplayed(false)//this.setState({ registerBtnDisplayed: false})
       Animated.timing(animate, {toValue: 0, duration: 500}).start()
    }

  }


    const RegisterRutificator = (e) => {
                let targetValue = e;
                let falseCase;

                let split = targetValue.split("");

                split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
                split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
                split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;

                (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

                split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
                split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;

                setNewRegisterRut(split.join(""));
      }

    const LoginRutificator = (e) => {
                  let targetValue = e;
                  let falseCase;

                  let split = targetValue.split("");

                  split.includes("-")? split.splice(split.indexOf("-"),1): falseCase= null;
                  split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;
                  split.includes(".")? split.splice(split.indexOf("."),1): falseCase= null;

                  (split.length>=2)?split[split.length-1] = "-" + split[split.length-1]:falseCase= null;

                  split.length >5 ? split[split.length-4] = "." + split[split.length-4]: falseCase= null;
                  split.length >7 ? split[split.length-7] = "." + split[split.length-7]: falseCase= null;
                  enterRut(split.join(""));
        }

    const singInValidation = () => {

    switch(0){
           case rut.length:
            Animated.sequence([
            	Animated.timing(rutAnimation, {
            		toValue: 10,
            		duration: 50
            	}),
            	Animated.timing(rutAnimation, {
            		toValue: -10,
            		duration: 50
            	}),
                Animated.timing(rutAnimation, {
            		toValue: 10,
            		duration: 50
            	}),
            	Animated.timing(rutAnimation, {
            		toValue: 0,
            		duration: 50
            	})
            ]).start()
            break;
            case password.length:
            Animated.sequence([
            	Animated.timing(passwordAnimation, {
            		toValue: 10,
            		duration: 50
            	}),
            	Animated.timing(passwordAnimation, {
            		toValue: -10,
            		duration: 50
            	}),
                Animated.timing(passwordAnimation, {
            		toValue: 10,
            		duration: 50
            	}),
            	Animated.timing(passwordAnimation, {
            		toValue: 0,
            		duration: 50
            	})
            ]).start()
            break;

            default:
             setverifyingLogIn("flex");
             setDisplayLoaderTwo("flex");
             setDisplayErrorTwo("none");
             fetch("http://patoexer.pythonanywhere.com/lawyer/" + rut)
                                            .then((response)=> {return response.json()})
                                            .then((data)=> {

                                                let dataToDispatch = {...data}
                                                dispatch({type: "USERDATA", doneAction: dataToDispatch});

                                                if(dataToDispatch.lawyers_password==password){

                                                if(!dataToDispatch.approved){
                                                    navigation.navigate('ThanksMsg')
                                                }else if(dataToDispatch.approved){
                                                    save(dataToDispatch)
                                                    setLetEnterBoolean(true)
                                                }

                                                } else{
                                                console.log("not verified2")
                                                setDisplayLoaderTwo("none")
                                                errorTwo.current.play()
                                                setDisplayErrorTwo("flex")

                                                }
                                            })
                                            .catch(error => {
                                            setDisplayLoaderTwo("none")
                                            errorTwo.current.play()
                                            setDisplayErrorTwo("flex")
                                            console.log(error)

                                            })

            }
      }

    return (
    <ImageBackground source={require('../images/lawyerLogin.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'stretch',resizeMode: "cover", justifyContent: "center"}}>
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={-100} style={{flex: 1,backgroundColor: "transparent", paddingTop: windowHeightPercentUnit*5}}>
          <View style={{flex: windowHeightPercentUnit*3, backgroundColor: 'transparent'}}>
            <Text style={[styles.welcome, {marginTop: windowHeightPercentUnit*4} ]}>BIENVENIDO A LA RED LEGALIS!</Text>
            <Text style={[styles.instructions, {color: 'white', fontWeight: '200'} ]}>Iniciar sesión</Text>
          </View>

          <View style={{flex: windowHeightPercentUnit*2, flexDirection: 'row', backgroundColor: 'transparent'}}>
            <View style={{flex:1, backgroundColor: "transparent"}}></View>
            <View style={{flex:8, backgroundColor: "transparent"}}>
                <TextInput returnKeyType={ 'done' } keyboardType={"numeric"} value={rut} onChangeText={x=> LoginRutificator(x)} placeholder = "Rut" style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*2, paddingLeft:10,borderBottomColor: '#b5b5b4', borderBottomWidth: 2, }}/>
                <TextInput  secureTextEntry={(!toggleCheckBoxLogin)?true:false} onChangeText={x=> enterPassword(x)} placeholder = "Clave" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: "white", height: windowHeightPercentUnit*5, width: "100%", borderColor: 'gray', borderWidth: 1, fontSize:windowHeightPercentUnit*2 , paddingLeft:10, borderBottomColor: '#b5b5b4', borderWidth: 0,}}/>
                <View style={{flex: 1, flexDirection:'row'}}>
                    {loginCheckbox}
                    <LottieView
                        ref={loaderTwo}
                        style={{
                            width: windowWidthPercentUnit*6,
                            height: windowHeightPercentUnit*6,
                            backgroundColor: '#4170f9',
                            display: displayLoaderTwo
                            }}
                        source={require('../assetsLottie/data.json')}
                        // OR find more Lottie files @ https://lottiefiles.com/featured
                        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                        />
                    <LottieView
                        ref={errorTwo}
                        loop={false}
                        style={{
                            height: windowHeightPercentUnit*10,
                            backgroundColor: '#4170f9',
                            display: displayErrorTwo
                        }}
                        source={require('../assetsLottie/error-response.json')}
                        // OR find more Lottie files @ https://lottiefiles.com/featured
                        // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                    />
                </View>
            </View>
            <View style={{flex:1, backgroundColor: "transparent"}}></View>
          </View>

          <View style={{flex: windowHeightPercentUnit*6, flexDirection: 'row', backgroundColor: 'transparent'}}>
            <View style={{flex:1, backgroundColor: "transparent"}}></View>
            <View style={{flex:8, backgroundColor: "transparent"}}>
                <TouchableHighlight onPress={singInValidation} onShowUnderlay={() =>{setLawyerAccessColor('black')}} onHideUnderlay={() =>{setLawyerAccessColor('white')}} activeOpacity={0.2} underlayColor="#747A87">
                    <View style={styles.button}>
                        <Text ref={lawyerSearching} style={[styles.buttonText,{ color: lawyerAccessColor}]}>Ingresar</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={{flex:1, backgroundColor: "transparent"}}></View>
          </View>

        </KeyboardAvoidingView>
    </ImageBackground >

    );

}

const styles = StyleSheet.create({
  instructions: {
    color: '#4170f9',
    textAlign: 'center',
    backgroundColor: "transparent",
    marginBottom: 0,
    borderColor: '#fff',
    fontSize:windowHeightPercentUnit*3,
    fontWeight: "bold"
  },
  welcome: {
      textAlign: 'center',
      margin: 0,
      color: "white",
      fontSize: windowHeightPercentUnit*5,
      fontWeight: 'bold'
    },
    link: {
    fontWeight: "bold",
    fontSize: windowHeightPercentUnit*3,
    textDecorationLine: "underline"
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

         }
});