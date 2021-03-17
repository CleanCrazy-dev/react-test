import React, {Component, useState, useEffect, useRef}  from 'react';
import { ImageBackground, PanResponder, Animated, Dimensions, Picker, Keyboard, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DropDownPicker from 'react-native-dropdown-picker'; // DOCUMENTATION https://www.npmjs.com/package/react-native-dropdown-picker


import { Video } from 'expo-av';
import Textarea from 'react-native-textarea';
import { JSHash, JSHmac, CONSTANTS } from "react-native-hash";

import { useSelector, useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';


    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/6);


export default function Query({navigation}){//ESTA PARTE ES LA VISTA DE EL INICIO DE LA CONSULTA

    const [subjects, setNewSubjects] = useState(['PROPIEDADES', 'HERENCIAS', 'DIVORCIOS', 'DESPIDOS', 'DEUDAS','DELITOS' , 'OTRAS CONSULTAS']);
    const [activeSubject, setNewActiveSubject] = useState(0);
    const [activeSubjectCounter, setNewActiveSubjectCounter] = useState(0);
    const [animatePosition, setNewAnimatePosition] = useState(new Animated.Value(0));
    const [animateFontSize1, setNewAnimateFontSize1] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize2, setNewAnimateFontSize2] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize3, setNewAnimateFontSize3] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize4, setNewAnimateFontSize4] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize5, setNewAnimateFontSize5] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize6, setNewAnimateFontSize6] = useState(new Animated.Value(windowHeightPercentUnit));
    const [animateFontSize7, setNewAnimateFontSize7] = useState(new Animated.Value(windowHeightPercentUnit));

    const [caseDescription, setNewCaseDescription] = useState("");
    const [userName, setNewUserName] = useState("");
    const [fetchResponse, setNewFetchResponse] = useState("");
    const [hourOfTheDay, sethourOfTheDay] = useState(0);

    const [descriptionAndNameAnimation, setdescriptionAndNameAnimation] = useState(new Animated.Value(0));
    const [dropDownSelection, setDropDownSelection] = useState(new Animated.Value(0));


    const [selectedValue, setSelectedValue] = useState("");

    const [lottieRecognitionPathBoolean, setLottieRecognitionPathBoolean] = useState(false);

    const [paymentTracker, setPaymentTracker] = useState(false);

    //USE REF'S
    const drunkenOwl = useRef(null);
    const voiceRecognition = useRef(null);
    const textarea = useRef(null);

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    useEffect(()=>{

    drunkenOwl.current.play();
    //voiceRecognition.current.play();
    let hour = new Date().getHours()
    sethourOfTheDay(hour)

    },[])



    useEffect(()=>{ //WE TRACK IF THE PAYMENT IS DONE, may be this could be recoded for more efficiency
       if(paymentTracker){//************************ IMPLEMENTAR REACT NATIVE BACKGROUND TIMER
       const trackingPaymentInterval = setInterval(()=>{

               fetch("http://patoexer.pythonanywhere.com/userByLawyers/2")
                      .then((resp)=> {return resp.json()})
                      .then((data)=> {
                      let lastAdviceUSer = data.resp[data.resp.length - 1];


                      if(lastAdviceUSer.users_name == userName){

                            dispatch({type: "USERDATA", doneAction: lastAdviceUSer});
                            navigation.navigate('QueryChat');//navigation.reset([NavigationActions.navigate({routeName: 'QueryChat'})]);

                        }
                      })
                      .catch( error => console.log(error))
               },1000)
       }


        },[paymentTracker])

    useEffect(()=>{
            //HERE WE ANIMATE THE FONT ON THE SUBJECT SELECTOR
                                switch(subjects[activeSubjectCounter]){
                                    case subjects[0]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[1]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()

                                        break;
                                    case subjects[2]:
                                         Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                         Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                         Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                         break;
                                    case subjects[3]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit*5, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[4]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[5]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit*5, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        break;
                                    case subjects[6]:
                                        Animated.timing(animateFontSize1, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize2, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize3, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize4, {toValue: windowHeightPercentUnit, duration: 500}).start();
                                        Animated.timing(animateFontSize5, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize6, {toValue: windowHeightPercentUnit, duration: 500}).start()
                                        Animated.timing(animateFontSize7, {toValue: windowHeightPercentUnit*3, duration: 500}).start()
                                        break;
                                }

        },[activeSubjectCounter])

     const _panResponder = PanResponder.create({
          // Ask to be the responder:
          //onStartShouldSetPanResponder: (evt, gestureState) => true,
          //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
               //console.log(gestureState)
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded

            if(gestureState.dx<0){
                    if(subjects[activeSubjectCounter].toUpperCase()!= "OTRAS CONSULTAS"){
                         Animated.timing(animatePosition, {toValue: animatePosition.__getValue() - windowWidthPercentUnit, duration: 500}).start()
                         setNewActiveSubjectCounter(activeSubjectCounter + 1)
                    }
                  }
            else{
                    if(subjects[activeSubjectCounter].toUpperCase()!= "PROPIEDADES"){
                        Animated.timing(animatePosition, {toValue: animatePosition.__getValue() + windowWidthPercentUnit, duration: 500}).start()
                        setNewActiveSubjectCounter(activeSubjectCounter - 1)

                    }
                }
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled

          },

        })

  const sendDescription=()=>{

      switch(0){
      case selectedValue.length:
              Animated.sequence([
                    Animated.timing(dropDownSelection, {
                              toValue: 10,
                              duration: 50
                          }),
                    Animated.timing(dropDownSelection, {
                              toValue: -10,
                              duration: 50
                          }),
                    Animated.timing(dropDownSelection, {
                              toValue: 10,
                              duration: 50
                          }),
                    Animated.timing(dropDownSelection, {
                              toValue: 0,
                              duration: 50
                          })
                    ]).start()
              break;
       case userName.length:
        Animated.sequence([
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: -10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: 0,
                        duration: 50
                    })
                ]).start()
          break;
      /*case caseDescription.length:
        Animated.sequence([
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: -10,
                        duration: 50
                    }),
                      Animated.timing(descriptionAndNameAnimation, {
                        toValue: 10,
                        duration: 50
                    }),
                    Animated.timing(descriptionAndNameAnimation, {
                        toValue: 0,
                        duration: 50
                    })
                  ]).start()
          break;*/
      default:
      if(selectedValue.toLowerCase() == 'otras consultas' || subjects[activeSubjectCounter].toLowerCase() == 'otras consultas' ){

            payment()
        }
        else
        {

            let clientData = {
                    "users_name": userName,
                    "users_issue_subject": (Platform.OS==='ios')?selectedValue:subjects[activeSubjectCounter],
                    "users_issue_description": caseDescription,
                    "lawyer_id": 1,
                    "taken": false,
                    "unlocked": false
                }

                let options = {
                            method: 'POST',
                            body: JSON.stringify(clientData),
                            headers: {'Content-Type': 'application/json'}};

                if(caseDescription.length>0 || userName.length>0){
                    fetch("http://patoexer.pythonanywhere.com/user/1", options)
                            .then((response)=> response.json())
                            .then((data)=> {
                                dispatch({type: "USERDATA", doneAction: data});
                                navigation.navigate('videoComponent');
                            })
                            .catch(error => {console.log(JSON.stringify(error))})
                }
         }
    }

}

    const startRecognize=()=>{

    setLottieRecognitionPathBoolean(true);
    voiceRecognition.current.reset();
    setTimeout(()=>{voiceRecognition.current.play();},100)


    }

    const payment = () => {

            let random = Math.floor(Math.random()*10000000);

            let basePath= '';
            let secretKey = '';
            let urlnotify = '';
            let options = {};
            let data = {};

            basePath= 'https://app.payku.cl/api/transaction';
            secretKey = "d7243a0609351f4e7024ad497790efce";
            urlnotify = 'https://app.payku.cl/'
            options = {method: 'POST',
                           headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 4fd3f80a2a367d545d9af93ab3c01979' //token publico
                                },
                       body: JSON.stringify(data) // se envia denuevo el obj, se envia por aca y denuevo en la firma, doble seguridad
                       }
           // hay dos paginas para probar la api, que entregan token diferentes. Una es para el sandbox y la otra para transacciones reales. Intenga ocupar los token para cada fin específico
           // una vez hecho el post confirma transacción con get, poniendo en authorization del header el token público ej: Bearer 87933aa65bc6af7ceae8fda096054dc3
           // la respueta 200 trae url que es donde se inicia el proceso de pago, una vez concluye proceso y se paga efectivamente, lo que pusiste como returnurl se ejecuta luego del pago y trae al cliente allá

                JSHash(random, CONSTANTS.HashAlgorithms.sha256) // HASHING RANDOM IS NOW UNNECESARY, BUT I WILL LET LIKE THIS
                  .then(hash => {

                           let urlReturn = "http://patoexer.pythonanywhere.com/paymentOk/1/userName=" + userName + "&description=" + caseDescription + "/5000";
                           urlReturn = urlReturn.replace(/ /g, "_")
                           urlReturn = urlReturn.replace(/\n/g, "")
                           urlReturn = urlReturn.normalize("NFD").replace(/[\u0300-\u036f]/g, "")// WE PREVENT URL ERRORS NORMALIZING THE STRING

                           data = {
                                   email: "legalisproyect@gmail.com",// WE DON'T HAVE CLIENT EMAIL, SO WE LET OUR MAIL.
                                   urlreturn: urlReturn, //colocar un identificador de pago, hacer tabla de pagos, endpoint flask de tabla pagos
                                   urlnotify: urlnotify,// 'https://des.payku.cl/', // cuando el banco confirma el proceso del pago, se envía a una url los detalles de confirmacion de pago. HAy que hacer bkan con python para almacenar en base de datos
                                   order:  random,
                                   subject: 'chat ilimitado por OTRAS CONSULTAS',
                                   amount: 5000,
                                   payment: 1
                                   };

                           options.body = JSON.stringify(data)

                               const orderedData = {};
                               Object.keys(data).sort().forEach(function(key) {
                                 orderedData[key] = data[key];
                               });

                               const arrayConcat = new URLSearchParams(orderedData).toString(); //obj se tranforma en url string

                               const concat = basePath + "&" + arrayConcat;

                               let sign;

                               JSHmac(concat, "79c5481cffd3ecbd0c8ade5e5b5fc2c6", CONSTANTS.HmacAlgorithms.HmacSHA256)
                                 .then(hash =>{return sign = hash})//adonde dejo esto?
                                 .catch(e => console.log(e));

                               fetch(basePath, options)
                               .then( (resp)=>{return resp.json()})
                               .then( (data)=>{
                                setPaymentTracker(true)
                                Linking.openURL(data.url).catch(err => console.error("Couldn't load page", err));
                                })
                                .catch(error => console.log(JSON.stringify(error)))
                  })
                  .catch(e => console.log("error" + e));


           }

    return (
    <ImageBackground source={(hourOfTheDay<24)?require('../images/query.png'):require('../images/sorryBackground.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'stretch',resizeMode: "cover", justifyContent: "center"}}>
    <KeyboardAvoidingView behavior='height' style={{flex: windowHeightPercentUnit, paddingTop: windowHeightPercentUnit*5}}>

        <View  style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit, backgroundColor: "transparent"}:{ display:'none'}}>
            <Text style={[styles.welcome, {fontSize: windowHeightPercentUnit*4, padding: windowHeightPercentUnit }]}>¿CUÁL ES TU CASO?</Text>
        </View>

        <View style={(hourOfTheDay>=24)?{alignItems: "center", flex: windowHeightPercentUnit*10, backgroundColor: "transparent", marginTop:50}:{ display:'none'}}>
            <Text style={styles.instructions}>Lo sentimos, nuestros abogados estan fuera de su horario laboral.</Text>
            <Text style={styles.instructions}>Nuestra hora de atención es de <Text style={{fontWeight: 'bold'}}>8:00 a 20:00 hrs</Text>.</Text>
            <LottieView
                ref={drunkenOwl}
                style={{
                width: windowWidthPercentUnit*50,
                height: windowHeightPercentUnit*50,
                backgroundColor: 'transparent'//,
                //display:(Platform.OS === 'ios')?"flex":"none"
                }}
                source={require('../assetsLottie/the-drunken-owl.json')}
                // OR find more Lottie files @ https://lottiefiles.com/featured
                // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
            />

        </View>

        <View style={(hourOfTheDay>=24)?{flex: windowHeightPercentUnit*2, backgroundColor: "transparent"}:{ display:'none'}}>
                    <Text style={[styles.instructions, {fontWeight:'bold'}]}>Por favor , intente más tarde.</Text>
                </View>


        <View style={(hourOfTheDay<24)?{ flex: windowHeightPercentUnit*4, elevation: 5, padding: windowHeightPercentUnit, backgroundColor: 'transparent', flexDirection: 'row'}:{ display:'none'}} >

            <Animated.View style={{flex:1, left: dropDownSelection}} >
            <Text style={[styles.instructions, {color: "red", fontWeight: 'bold', textAlign: 'center', display: (selectedValue.toLowerCase() == 'otras consultas' || subjects[activeSubjectCounter].toLowerCase() == 'otras consultas')?'flex':'none' }]}>*El item de OTRAS CONSULTAS requiere pagar por asesoría un valor de $5.000</Text>
            <DropDownPicker
                             items={[
                                 {label: 'Propiedades', value: 'PROPIEDADES'},
                                 {label: 'Herencias', value: 'HERENCIAS'},
                                 {label: 'Divorcios', value: 'DIVORCIOS'},
                                 {label: 'Despidos', value: 'DESPIDOS'},
                                 {label: 'Deudas', value: 'DEUDAS'},
                                 {label: 'Delitos', value: 'DELITOS'},
                                 {label: 'Otras Consultas', value: 'OTRAS CONSULTAS'},

                             ]}
                             containerStyle={{height: 60}}
                             style={{backgroundColor: '#3e6de3', width: '100%'}}
                             arrowColor="#3e6de3"
                             arrowSize={30}
                             arrowStyle={{backgroundColor: 'white', borderRadius: 100}}
                             itemStyle={{
                                 justifyContent: 'center'
                             }}
                             dropDownStyle={{backgroundColor: '#3e6de3' }}
                             labelStyle={{
                                 textAlign: 'center',
                                 fontSize: windowHeightPercentUnit*4,
                                 color: 'white',
                                 fontWeight: 'bold',
                                 borderRadius:50
                             }}
                             placeholder="Especialidad"
                             onChangeItem={item => {
                                setSelectedValue(item.value)
                                                     } }
                         />
            </Animated.View>
        </View>

        <Text style={[styles.instructions, {elevation:1, color: "white", fontWeight: 'bold', textAlign: 'center', display: (subjects[activeSubjectCounter].toLowerCase() == 'otras consultas' && Platform.OS==='android')?'flex':'none' }]}>*El item de OTRAS CONSULTAS requiere pagar por asesoría un valor de $5.000</Text>


        {/*<View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*5,  flexDirection: 'row', backgroundColor: "transparent"}:{ display:'none'}}>

            <View style={{flex: 2}}></View>
            <View style={[{ width: "100%", flex:1, alignItems: "center" ,flexDirection: 'column',backgroundColor: 'transparent'}]}>
                <TouchableWithoutFeedback style={(Platform.OS === 'ios')? {display:'flex'}: {display:'none'}} onPress={() => startRecognize()}>
                    <LottieView
                                    ref={voiceRecognition}
                                    style={{
                                    elevation: 1,
                                    width: windowWidthPercentUnit*30,
                                    height: windowHeightPercentUnit*30,
                                    backgroundColor: 'transparent',
                                    }}
                                    source={(!lottieRecognitionPathBoolean)?require("../assetsLottie/lf30_editor_a5fkbzjs.json"):require("../assetsLottie/sound-wave.json")}
                                    // OR find more Lottie files @ https://lottiefiles.com/featured
                                    // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
                                />
                </TouchableWithoutFeedback>

            </View>
            <View style={{flex: 2}}></View>
        </View>*/}

        <View style={{flex:windowHeightPercentUnit*5, margin:0}} >
            <View style={(hourOfTheDay<24)?{flex: windowHeightPercentUnit*10, flexDirection:'column', margin:0 , backgroundColor: "transparent"}:{ display:'none'}} >

                <TextInput placeholder="Escribe tu nombre" placeholderTextColor="#8b8b8a" onChangeText={x=> setNewUserName(x)} style={{height: windowHeightPercentUnit*8, padding: windowHeightPercentUnit, fontSize: windowHeightPercentUnit*5, textAlign: 'center',backgroundColor: '#e4e4e4',borderBottomColor: '#b5b5b4', borderBottomWidth: 2, borderTopRightRadius:10, borderTopLeftRadius:10, marginLeft: windowWidthPercentUnit/2, marginRight: windowWidthPercentUnit/2}} />
                  <Textarea
                     returnKeyType='done'
                     ref={textarea}
                     style={{borderBottomRightRadius:10, borderBottomLeftRadius:10, textAlignVertical: 'center', textAlign: 'center',backgroundColor: '#e4e4e4', fontSize: windowHeightPercentUnit*3, height: '100%', marginLeft: windowWidthPercentUnit/2, marginRight: windowWidthPercentUnit/2, marginTop:0}}
                     onChangeText={x=>{
                        setNewCaseDescription(x)
                       }}
                     onKeyPress={e =>{
                            if(e.nativeEvent.key === 'Enter')
                                {
                                    let cutTheEnter = caseDescription.substring(0, caseDescription.length - 1);
                                    textarea.current.value = cutTheEnter
                                    setNewCaseDescription(cutTheEnter)
                                    Keyboard.dismiss()
                                }
                            }
                        }
                     maxLength={0}
                     placeholder={'¿Cuál es tu problema legal?'}
                     placeholderTextColor={'#8b8b8a'}
                     underlineColorAndroid={'transparent'}
                  />

            </View>


        </View>

        <View style={{flex:windowHeightPercentUnit*2}}>
            <TouchableOpacity
               style={(hourOfTheDay<=24)?{padding: windowHeightPercentUnit*3, paddingTop: windowHeightPercentUnit ,backgroundColor: "transparent", color: 'white', alignItems: "flex-end"}:{ display:'none'}}
               color="white"
               onPress={()=> {  sendDescription()
               }}
            >
                <Text style={{fontSize:windowHeightPercentUnit*5, fontWeight:'bold', color: "white"}}>SIGUIENTE</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
    </ImageBackground >
    );
  //}
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: 'center',
    margin: 0,
    padding: windowHeightPercentUnit*4,
    color: "#3b2960",
    fontSize: windowHeightPercentUnit*4,
    fontWeight: 'bold',

  },
  instructions: {
      color: 'white',
      backgroundColor: "transparent",
      borderColor: '#fff',
      fontSize:windowHeightPercentUnit*2,
      textAlign: "justify",
      paddingLeft: windowHeightPercentUnit*4,
      paddingRight: windowHeightPercentUnit*4,
      margin:10,

    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },


});

