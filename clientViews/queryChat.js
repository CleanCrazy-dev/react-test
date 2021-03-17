import React, {Component, useState, useEffect, useRef }  from 'react';
import { ImageBackground, TouchableHighlight, Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CommonActions } from '@react-navigation/native';
import store from '../redux/store.js';
import {KeyboardAvoidingView, Animated, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component'; // DOCUMENTATION ON https://github.com/talalmajali/react-native-countdown-component
import { ModalPortal, Modal, ModalContent } from 'react-native-modals';
import LottieView from 'lottie-react-native';
import {Transition, Transitioning} from 'react-native-reanimated'

//IMPORTATION OF VIEW COMPONENTS
import Query from './query.js';
import {Home} from './home.js';
import ClientRegister from './register.js';
import ClientProfile from './clientProfile.js';
import CaseChat from './caseChat.js';

    // DEVICE SIZE
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowHeightPercentUnit = parseInt(windowHeight/100);
const windowWidthPercentUnit = parseInt(windowWidth/100);


export function QueryChat({navigation}) {

    //REDUX STATE
    const store = useSelector(state => state.userData);
    const dispatch = useDispatch();

    //FUNCTIONAL COMPONENT STATE
    const [registerBtnDisplayed, setNewRegisterBtnDisplayed] = useState(1);
    const [animate, setNewanimate] = useState(new Animated.Value(windowHeightPercentUnit/2));
    const [messageAnimation, setMessageAnimation] = useState(new Animated.Value(0));
    const [description, setNewDescription] = useState(store.users_issue_description);
    const [messageInputContent, setMessageInputContent] = useState("");
    const [message, enterMessage] = useState([]);
    const [returnedMessageId, setReturnedMessageId] = useState(0);
    const [stillTypingAdvisor, booleanStillTypingAdvisor] = useState(false);
    const [startCountDown, InitCountDown] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [taken, setTaken] = useState(false);
    const [lawyerRespone, setLawyerRespone] = useState("LOADING...");
    const [chatLoaderColor, setchatLoaderColor] = useState('#4170f9');
    const [countDownStarter, setCountDownStarter] = useState(false);
    const [lawyerId, setLawyerId] = useState(store.lawyer_id);
    const [caseBriefTextAnimation, setCaseBriefTextAnimation] = useState(new Animated.Value(windowHeightPercentUnit*3.5));




    //REFERENCES
    const inputRef = useRef(null);
    const typingRef = useRef(null);
    const timerRef = useRef(null);
    const chatLoader = useRef(null);
    const mappedRefs= useRef([]);
    const countDownRef = useRef(null);


    //TRANSITION
    const transition = (

    <Transition.Together>
        <Transition.In
            type="scale"
            durationMs={200}
            interpolation='easeInOut'
        />
    </Transition.Together>
    )

    useEffect(()=>{
    Animated.timing(messageAnimation,{toValue: 350,duration: 1000}).start();

    if(mappedRefs.current.length>0){
    let last = mappedRefs.current.length - 1;
    mappedRefs.current[last].animateNextTransition();
    }
    },[message])

     useEffect(()=>{

                        Animated.loop(Animated.sequence([
                                                	Animated.timing(caseBriefTextAnimation, {
                                                		toValue: windowHeightPercentUnit*3.5,
                                                		duration: 2000
                                                	}),
                                                	Animated.timing(caseBriefTextAnimation, {
                                                		toValue: windowHeightPercentUnit*3.9,
                                                		duration: 500
                                                	}),
                                                    Animated.timing(caseBriefTextAnimation, {
                                                		toValue: windowHeightPercentUnit*3.5,
                                                		duration: 200
                                                	}),
                                                	Animated.timing(caseBriefTextAnimation, {
                                                        toValue: windowHeightPercentUnit*3.9,
                                                        duration: 500
                                                    }),
                                                    Animated.timing(caseBriefTextAnimation, {
                                                        toValue: windowHeightPercentUnit*3.5,
                                                        duration: 200
                                                    }),
                                                ])).start()

                        setTimeout(()=>{
                        setNewRegisterBtnDisplayed(0)
                        Animated.timing(animate, {toValue: windowHeightPercentUnit/2, duration: 300}).start()
                        }, 3000);


                      let fetchInterval = setInterval(()=>{

                                         fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id)
                                         .then((response)=> { return response.json()})
                                         .then((data)=>{
                                             if(data.taken){
                                             InitCountDown(true)
                                             setTaken(true)
                                             CountDown.defaultProps = {running: false}
                                             }
                                             if(data.unlocked){
                                               setUnlocked(true)
                                               }

                                         })
                                         .catch((error)=>{})
    let preventDefaultLawyerId = lawyerId || 2;
    console.log("http://patoexer.pythonanywhere.com/message/" + store.users_id  + "/0/" + preventDefaultLawyerId)

                                         fetch("http://patoexer.pythonanywhere.com/message/" + store.users_id  + "/0/" + preventDefaultLawyerId)//store.lawyer_id)
                                         .then((response)=> response.json())
                                         .then((data)=>
                                                       {
                                                       if(message[message.length - 1 ]!= data[data.length - 1].messages_content){
                                                             if(data[data.length - 1].messages_content == "typing..." && data[data.length - 1].messages_origin=="lawyer" ){
                                                             this.typingRef.current.style = "inline";
                                                             Animated.timing(messageAnimation,{toValue: 350,duration: 500}).start();

                                                             }
                                                             else{
                                                                enterMessage([...data])
                                                                Animated.timing(messageAnimation,{toValue: 350,duration: 500}).start();
                                                             }
                                                             }
                                                       })
                                                       .catch((error)=> console.log(error))
                                       }, 1000);
      // return en useffect es como componentWillUnmunt
      return ()=>{
          clearInterval(fetchInterval);
          let options = {
                      method: 'DELETE',
                      headers: {'Content-Type': 'application/json'}};

          fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
              .then((response)=> response.json())
              .then((data)=> {

                let options = {
                                      method: 'DELETE',
                                      headers: {'Content-Type': 'application/json'}};

                          fetch("http://patoexer.pythonanywhere.com/message/" + store.users_id, options)
                              .then((response)=> response.json())
                              .then((data)=> {
                              })
                              .catch(error => {})
              })
              .catch(error => {})

            }

      }, []);

   const typing = (x) => {
       let today = new Date();
       let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
       let preventDefaultLawyerId = lawyerId || 2;

       let casesData = {
                             "messages_date": currentDate,
                             "messages_content": "typing...",
                             "messages_origin": "user",
                             "client_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                             "user_id": store.users_id,
                             "lawyer_id": preventDefaultLawyerId //SE PUSO EL LAWYER FIJO MIENTRAS
                           }

          let options2 = {
                             method: 'POST',
                             body: JSON.stringify(casesData),
                             headers: {'Content-Type': 'application/json'}};

           if(!stillTypingAdvisor){ console.log(" ******************** http://patoexer.pythonanywhere.com/message/1/0/" + preventDefaultLawyerId)

           fetch("http://patoexer.pythonanywhere.com/message/1/0/" + preventDefaultLawyerId, options2)
              .then((response)=> { return response.json()})
              .then((data)=> {
              setReturnedMessageId(data.resp.messages_id)
              })
              .catch(error => console.log(JSON.stringify(error)))
              booleanStillTypingAdvisor(true);
           }
   }

   const enterNewMessage = () =>{

   let today = new Date();
   let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
   let casesData = {
                      "messages_date": currentDate,
                      "messages_content": messageInputContent,
                      "messages_id": returnedMessageId,
                      "messages_origin": "user",
                      "user_id": store.users_id,
                      "client_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                      "lawyer_id": 1
                    }

   let options2 = {
                      method: 'PUT',
                      body: JSON.stringify(casesData),
                      headers: {'Content-Type': 'application/json'}};

    if(stillTypingAdvisor){

    fetch("http://patoexer.pythonanywhere.com/message/1/0/0", options2)
       .then((response)=> response.json())
       .then((data)=> {console.log(JSON.stringify(data))})
       inputRef.current.clear()
    }

    booleanStillTypingAdvisor(false);


   }

   const payment = () => {

   let options = {
                         method: 'DELETE',
                         headers: {'Content-Type': 'application/json'}};

             fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id, options)
                 .then((response)=> response.json())
                 .then((data)=> {
                    return navigation.reset([NavigationActions.navigate({routeName: 'ClientRegister'})]);
                 })
                 .catch(error => {})
   }

   const showCase =() => {

   caseBriefTextAnimation.stopAnimation(()=> {
                           console.log("paramos el loop")
                       })

   dispatch({type: "USERID", doneAction: 43})
    if(registerBtnDisplayed == 0){
       //this.setState({flex:{registerView:8}, registerBtnDisplayed: true})
       setNewRegisterBtnDisplayed(1)
        Animated.timing(animate, {toValue: windowHeightPercentUnit*3.5, duration: 300}).start()
    }
    else if(registerBtnDisplayed == 1){

       setNewRegisterBtnDisplayed(0)
       Animated.timing(animate, {toValue: windowHeightPercentUnit/2, duration: 300}).start()
    }
  }

  const waitingForLawyersResponse =()=> {

    let posibleRjectionArr =["No es un caso real", "No requiere gestión alguna", "No piensa contratar abogado en lo pronto", "No tiene capacidad de pago", "Quien consulta no toma la desición de contratar"]
    setModalVisibility(true)
    let fetchLawyerResponseInterval = setInterval(()=>{
    fetch("http://patoexer.pythonanywhere.com/user/" + store.users_id)
                             .then(response =>{return response.json()})
                             .then((data)=>{ console.log(JSON.stringify(data))

                                 if(posibleRjectionArr.includes(data.rejectionReazon)){
                                         setLawyerRespone("El abogado a rechazado tu caso, ya que " + data.rejectionReazon)
                                 }

                             }
                              )
                              .catch((error)=> console.log("error"))



    },1000)
  }


    return (

  <ImageBackground source={require('../images/chat.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, resizeMode: 'cover', justifyContent: "center"}}>

    <KeyboardAvoidingView style={{flex:1, paddingTop: windowHeightPercentUnit*5}} behavior="padding" keyboardVerticalOffset={windowHeightPercentUnit*5} >
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: "transparent"}}>
        <Animated.View style={{ flex: animate, flexDirection: 'row', backgroundColor: "transparent"}}>
            <View style={{flex: windowHeightPercentUnit*2, flexDirection:"column"}}>
            </View>
            <View  style={{flex: windowHeightPercentUnit*8}}>
                <View style={{flex: windowHeightPercentUnit*5}}>
                    <Animated.Text onPress={showCase} style={[{fontSize: caseBriefTextAnimation, textAlign: 'center'},styles.welcomeSmall]}>RESUMEN CASO</Animated.Text>
                    <ScrollView>
                    <Text style={{fontSize: windowHeightPercentUnit*2, color: "white", textAlign: 'justify', paddingLeft:windowWidthPercentUnit*10, paddingRight:windowWidthPercentUnit*10, paddingTop: windowHeightPercentUnit}}>{description}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{flex: windowHeightPercentUnit*2}}></View>

        </Animated.View >
        <View style={{flex: windowHeightPercentUnit*10}}>
        <Text ref={typingRef} style={{display: 'none'}}>El abogado esta escribiendo...</Text>
            <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "transparent"}}>
                <TouchableHighlight style={{display: (taken)?'none': 'flex', backgroundColor:'#3b2960', borderRadius:10, margin:10, marginTop:windowHeightPercentUnit*10, padding: 10}}>
                    <Text style={{fontWeight: "bold", textAlign: "center", fontSize: windowHeightPercentUnit*2, color:'white'}}>
                        Por favor espera mientras uno de nuestros abogados ingresa al chat para atenderte
                    </Text>
                </TouchableHighlight>
                {
                  message.map(
                    function(item, index)
                    {
                        let style;
                        let color;
                        let align;
                        let initialValue = 0;
                        let chatLoaderColor;
                        if(item.messages_origin=="lawyer"){
                            style = styles.lawyerStyle;
                            color = 'white';
                            align = 'justify';
                            chatLoaderColor = "#4170f9";
                        }else if(item.messages_origin=="user"){style = styles.clientStyle; color = 'black'; align = 'right';chatLoaderColor = "#E5E7E9";}
                        return (
                      <Transitioning.View
                            transition={transition}
                            ref={(el) => (mappedRefs.current[index] = el)}
                            >
                        <TouchableHighlight style={style}>
                            <Animated.Text key={index} style={{ textAlign: (item.messages_content=='typing...')?"center": align , fontSize: windowHeightPercentUnit*2, color:color}}>
                                <LottieView
                                     ref={chatLoader}
                                     autoPlay
                                     loop
                                     style={{
                                     width: windowWidthPercentUnit*20,
                                     backgroundColor: chatLoaderColor,
                                     display: (item.messages_content=='typing...')?'flex':'none'
                                     }}
                                     source={require('../assetsLottie/chat-loader2.json')}
                                 />
                                 {(item.messages_content!='typing...')?item.messages_content: ""}
                            </Animated.Text>
                        </TouchableHighlight>
                      </Transitioning.View>
                        )
                    }

                                )
                }

            </ScrollView>
        </View>


        <CountDown
            ref={countDownRef}
            running={true}
            until={420}
            onFinish={() => ("users_id" in store && unlocked===false)? waitingForLawyersResponse():setModalVisibility(false)}
            style={(startCountDown && unlocked===false)?{marginRight: windowWidthPercentUnit*80, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#3b2960"}:{display: "none"}}
            size={20}
            timeToShow={['M','S']}
            digitStyle={{marginRight: 0, padding: 0 , backgroundColor: '#3b2960', borderColor: '#3b2960'}}
            digitTxtStyle={{color: 'white'}}
            timeLabelStyle={{color: '#3b2960', fontWeight: 'bold'}}
            separatorStyle={{color: 'white'}}
            timeLabels={{m: null, s: null}}
            showSeparator={true}
            />


        <View style={{ marginBottom: windowHeightPercentUnit*5, padding:20, flexDirection: 'row', borderColor:'transparent', backgroundColor: '#e4e4e4', borderTopWidth: 3}}>
            <View style={{flexDirection: 'row', flex: 1,padding: 5, backgroundColor: 'white', borderColor: '#bebec2', borderWidth:2, borderRadius:50}}>
                <TextInput ref={inputRef} placeholder={'Escribir...'} onChangeText={x=> {setMessageInputContent(x); typing(x)}} style={{flex:1, backgroundColor: "transparent", height:60, fontSize: windowHeightPercentUnit*2, padding: 20}}/>
                <Icon type='font-awesome' name='arrow-circle-o-right' onPress={enterNewMessage} size={50} style={{padding:5}} color='black'/>
            </View>
        </View>


        <ModalPortal />
                <Modal
                    visible={modalVisibility}
                    onTouchOutside={() => {

                    }}
                  >
                    <ModalContent>
                      <View style={{textAlign: 'center', alignItems: 'center', fontSize:windowHeightPercentUnit*3, color: "red", fontWeight: "bold"}}>{(lawyerRespone== 'LOADING...')?<LottieView autoPlay loop style={{width: windowWidthPercentUnit*20}} source={require('../assetsLottie/15146-clock-waiting-animation2.json')} />:<Text style={{textAlign: 'center', alignItems: 'center', }}>{lawyerRespone}</Text>}</View>
                      <Text style={styles.modalStyle}>Se acabó el tiempo!</Text>
                      <Text> </Text>
                      <Text style={styles.modalStyle}>Si su caso le interesó a su abogado, éste debloqueará el chat ilimitado</Text>
                      <Text> </Text>
                      <Text style={styles.modalStyle}>Por favor espere unos minutos, no salga de la aplicación</Text>
                      <Text style={styles.modalStyle}> </Text>
                      <Text style={styles.modalStyle}> </Text>

                    </ModalContent>
                  </Modal>
     </View>
     </KeyboardAvoidingView>
    </ImageBackground >
    );

}

const styles = StyleSheet.create({
  welcomeSmall: {
      textAlign: 'center',
      marginTop: 0,
      color: 'white',
      fontWeight: 'bold'
    },
  lawyerStyle: {
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: "#4170f9",
    fontSize: windowHeightPercentUnit*2,
    marginRight:50,
    marginLeft: 10,
    marginTop: 20,
    padding:15,
    paddingRight: 5,

  },
  clientStyle: {
    backgroundColor: "#E5E7E9",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    marginRight:10,
    marginLeft: 50,
    marginTop: 20,
    padding:20,
    paddingRight: 5,
    alignItems: 'center'
    },
  modalStyle:{
    color:"#3e6de4",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    fontSize:windowHeightPercentUnit*3,
    textAlign: 'center',
    },
});

