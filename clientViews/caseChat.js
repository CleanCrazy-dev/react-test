import { Platform, Alert, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder, Link } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import React, {Component, useState, useEffect, useRef }  from 'react';


import {Animated} from 'react-native';


export default function CaseChat() {


    //REDUX STATE
     const store = useSelector(state => state);
     const selectedCase = useSelector(state => state.selectedCase);
     const dispatch = useDispatch();

    // COMPONEN STATE
     const [data, setData]= useState({time: 6, title: 'Event 1', description: 'Event 1 Description'});
     const [animateCaseContainer, setAnimateCaseContainer] = useState(new Animated.Value(8));
     const [animateCaseUpdate, setAnimateCaseUpdate]=useState(new Animated.Value(5));
     const [animateCaseSummary, setAnimateCaseSummary]=useState(new Animated.Value(5));
     const [registerBtnDisplayed, setRegisterBtnDisplayed] = useState(false);
     const [caseBrief, setCaseBrief]= useState(selectedCase.cases_description)//store.userData.casesResp[store.userData.selectedCase].cases_description)
     const [timeLine, setTimeLine]= useState([{ succeded: true ,id: 1, phase: "Presentación demanda"}, { succeded: true, id: 2, phase: "Ratificación firma"}, {succeded: true, id: 3, phase: "Contestación"}, {succeded: false,  id: 4, phase: "Término Probatorio"}, {succeded: false, id: 5, phase: "Dictación de sentencia"}]);
     const [phaseShowedOnTimeline, setPhaseShowedOnTimeline]= useState("");
     const [animatephaseShowedOnTimeline, setAnimatephaseShowedOnTimeline]= useState(new Animated.Value(0));

     const [messageInputContent, setMessageInputContent] = useState("");
     const [returnedMessageId, setReturnedMessageId] = useState(0);
     const [stillTypingAdvisor, booleanStillTypingAdvisor] = useState(false);
     const [message, enterMessage] = useState([]);


    //REFERENCES
        const inputRef = useRef(null);
        const typingRef = useRef(null);

  useEffect(()=>{

                        let fetchInterval = setInterval(()=>{
                                                                 fetch("http://patoexer.pythonanywhere.com/message/0/" + store.userData.clientsResp.clients_id + "/" + store.selectedCase.lawyer_id )
                                                                 .then((response)=> response.json())
                                                                 .then((data)=>
                                                                               { console.log(JSON.stringify(store.selectedCase))
                                                                               if(message[message.length - 1 ]!= data[data.length - 1].messages_content){
                                                                                     if(data[data.length - 1].messages_content == "typing..." && data[data.length - 1].messages_origin=="lawyer" ){
                                                                                     this.typingRef.current.style = "inline";

                                                                                     }
                                                                                     else{
                                                                                        enterMessage([...data])
                                                                                     }
                                                                                     }
                                                                               })
                                                               }, 1000);
        // return en useffect es como componentWillUnmunt
        return ()=>{
            clearInterval(fetchInterval);
            }


        }, []);





  const sendMessage = () => {

    let today = new Date();
    let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    let casesData = {
                       "messages_date": currentDate,
                       "messages_content": messageInputContent,
                       "messages_id": returnedMessageId,
                       "messages_origin": "client",
                       "user_id": store.users_id,
                       "clients_id": 0, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                       "lawyer_id": 1
                     }

    let options2 = {
                       method: 'PUT',
                       body: JSON.stringify(casesData),
                       headers: {'Content-Type': 'application/json'}};

     if(stillTypingAdvisor){//si entra

     fetch("http://patoexer.pythonanywhere.com/message/0/1/0", options2)
        .then((response)=> response.json())
        .then((data)=> {console.log(JSON.stringify(data))})
        inputRef.current.clear()
     }

     booleanStillTypingAdvisor(false);


  }

  const showCaseSummary = () => {
    if(!registerBtnDisplayed){

        Animated.timing(animateCaseContainer, {toValue: 30, duration: 300, useNativeDriver: true, }).start()
        Animated.timing(animateCaseUpdate, {toValue: 1, duration: 0, useNativeDriver: true, }).start()
        setRegisterBtnDisplayed(true);

    }
    else if(registerBtnDisplayed){
      Animated.timing(animateCaseSummary, {toValue: 5, duration: 0, useNativeDriver: true, }).start()
      Animated.timing(animateCaseContainer, {toValue: 8, duration: 300, useNativeDriver: true, }).start()
      Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
      setRegisterBtnDisplayed(false);
    }

  }

  const showCaseUpdate = () => {
        if(!registerBtnDisplayed){//--------->


           Animated.timing(animateCaseSummary, {toValue: 1, duration: 0, useNativeDriver: true, }).start()
            Animated.timing(animateCaseContainer, {toValue: 25, duration: 300, useNativeDriver: true, }).start()
            Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
            setRegisterBtnDisplayed(true);
        }
        else if(registerBtnDisplayed){


           Animated.timing(animateCaseSummary, {toValue: 5, duration: 0, useNativeDriver: true, }).start()
           Animated.timing(animateCaseContainer, {toValue: 8, duration: 300, useNativeDriver: true, }).start()
           Animated.timing(animateCaseUpdate, {toValue: 5, duration: 300, useNativeDriver: true, }).start()
           setRegisterBtnDisplayed(false);
        }

      }

    const showPhase = (phase) => {

        setPhaseShowedOnTimeline(phase)
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 0, duration: 0}).start(()=>{
        Animated.timing(animatephaseShowedOnTimeline, {toValue: 1, duration: 800, useNativeDriver: true, }).start()})
    }

    const typing = (x) => { console.log(store.userData.clientsResp.clients_id)
           let today = new Date();
           let currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()

           let casesData = {
                                 "messages_date": currentDate,
                                 "messages_content": "typing...",
                                 "messages_origin": "client",
                                 "client_id": store.userData.clientsResp.clients_id, //KEEPS THIS STATIC COS THE BACKEND TRANSLATE LIKE NULL ON TABLE
                                 "user_id": 0,
                                 "lawyer_id": 1 //SE PUSO EL LAWYER FIJO MIENTRAS
                               }

              let options2 = {
                                 method: 'POST',
                                 body: JSON.stringify(casesData),
                                 headers: {'Content-Type': 'application/json'}};

               if(!stillTypingAdvisor){

               fetch("http://patoexer.pythonanywhere.com/message/0/1/0", options2)
                  .then((response)=> { return response.json()})
                  .then((data)=> {
                  setReturnedMessageId(data.resp.messages_id)
                  console.log(JSON.stringify(data))
                  })
                  .catch(error => console.log(JSON.stringify(error)))
                  booleanStillTypingAdvisor(true);
               }
       }




    return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: "white"}}>
                <Animated.View style={{flex: animateCaseContainer, flexDirection: 'row', backgroundColor: "#4170f9"}}>
                    <View style={{flex: 2, flexDirection:"column"}}>
                        <View style={{flex: 1}}></View>
                    </View>
                    <View style={{flex: 35}}>

                        <Animated.View style={{flex: animateCaseSummary}}>
                            <Text onPress={showCaseSummary} style={styles.welcomeSmall}>RESUMEN CASO</Text>
                            <ScrollView style={{flex: 5}}>
                            <Text style={{fontSize: 20, color: "white", textAlign: 'justify', paddingRight:30}}>{caseBrief}</Text>
                            </ScrollView>
                        </Animated.View>

                        <View
                          style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1
                          }}
                        />


                        <Animated.View style={{flex: animateCaseUpdate, flexDirection:'column'}}>
                            <Text onPress={showCaseUpdate} style={styles.welcomeSmall}>AVANCE CASO</Text>
                            <View style={{flexDirection: "row", felx: 2}}>
                            {timeLine.map((item)=>{
                            let color= ""
                            let roundedBorder=""
                            if(item.id ==1){roundedBorder=20}else{roundedBorder=0}
                                if(item.succeded == true){color="#39E938"}else{color="white"}
                            return (
                                <View key={item.id} style={{ marginTop:10 , flex: 3,flexDirection:'row', height: 30, width: 20}}>
                                    <View style={{flex: 1, backgroundColor: color, height: 10, width: 10, marginTop:8, borderTopLeftRadius: roundedBorder, borderBottomLeftRadius: roundedBorder }}>
                                    </View>
                                    <View style={{flex: 1, backgroundColor: color, height: 30, borderRadius:30, width: 20}}>
                                        <Text className={item.phase} style={{color: color, height: 30, borderRadius:30, width: 20}} onPress={()=> showPhase(item.phase)} >o</Text>
                                    </View>
                                </View>
                            )})}

                            </View>
                            <View style={{flex:1}}>
                                <Animated.Text style={{ opacity: animatephaseShowedOnTimeline, textAlign: 'center', color: 'white', fontSize:30, fontWeight: 'bold'}}>- {phaseShowedOnTimeline} -</Animated.Text>
                            </View>
                        </Animated.View>

                    </View>
                    <View style={{flex: 1}}>
                    </View>
                </Animated.View >

                <View style={{flex: 70}}>
                    <ScrollView style={{flex: 5, flexDirection: 'column', height: 150, backgroundColor: "white"}}>
                        {
                        message.map(
                        function(item){ console.log(JSON.stringify(item))

                        if(item.messages_origin=="client"){return <Text key={item.key} style={styles.clientStyle}> {item.messages_content} </Text>}
                        else if(item.messages_origin=="lawyer"){return <Text key={item.key} style={styles.lawyerStyle}> {item.messages_content} </Text>}}

                        )
                        }
                    </ScrollView>
                </View>
                <View style={{flex: 15, flexDirection: 'row', borderColor: "#4170f9", borderTopWidth: 3}}>
                    <View style={{flex:1, flexDirection:'column'}}><Text> </Text></View>
                    <View style={{flex:8}}><Text> </Text><TextInput ref={inputRef} onChangeText={x=> {setMessageInputContent(x); typing(x)}} style={{backgroundColor: "white", borderWidth:2, borderColor:"gray", borderRadius:10, height:60}}/></View>
                    <View style={{flex:3}}><Text> </Text><Icon onPress={sendMessage} size={50} name='send' color='#4170f9'/></View>
                </View>
             </View>
    );

}

const styles = StyleSheet.create({
  welcomeSmall: {
      textAlign: 'left',
      margin: 0,
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
    },
  lawyerStyle: {
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: "#4170f9",
    color:"white",
    fontWeight: "bold",
    fontSize:18,
    marginRight:50,
    marginLeft: 10,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
    textAlign: 'left'

  },
  clientStyle: {
    backgroundColor: "#E5E7E9",
    color:"black",
    borderWidth:1,
    borderColor: 'white',
    borderRadius: 10,
    fontWeight: "bold",
    fontSize:18,
    marginRight:10,
    marginLeft: 50,
    marginTop: 20,
    padding:15,
    paddingRight: 5,
    textAlign: 'right'
    },
});
