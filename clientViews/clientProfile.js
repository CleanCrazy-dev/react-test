import React, {Component, useState, useEffect, useRef }  from 'react';
import { TouchableOpacity, Alert, Platform, StyleSheet, Text, View, Button, Image, List, TextInput, FormLabel, FormInput, FormValidationMessage, ScrollView, PanResponder } from 'react-native';
import { ThemeProvider, Avatar, Card, ListItem, Icon, FlatList} from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import {dispatchSelectCase} from '../redux/dispatcher.js';

import logo1 from '../images/Avatar1.png'
import logo2 from '../images/Avatar2.png'
import logo3 from '../images/Avatar3.png'
import logo4 from '../images/Avatar4.png'
import logo5 from '../images/Avatar5.png'
import logo6 from '../images/Avatar6.png'
import logo7 from '../images/Avatar7.png'
import logo8 from '../images/Avatar8.png'
import logo9 from '../images/Avatar9.png'
import logo10 from '../images/Avatar10.png'



export default function ClientProfile({navigation}) {


    //REDUX STATE
        const store = useSelector(state => state.userData);
        const dispatch = useDispatch();

    //REFERENCES
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const ref7 = useRef(null);
    const ref8 = useRef(null);
    const ref9 = useRef(null);
    const ref10 = useRef(null);


    // USESTATE
        const [avatarArr, stateNewAvatarArr] = useState(['../images/Avatar1.png', '../images/Avatar2.png', '../images/Avatar3.png', '../images/Avatar4.png', '../images/Avatar5.png', '../images/Avatar6.png', '../images/Avatar7.png', '../images/Avatar8.png', '../images/Avatar9.png', '../images/Avatar10.png']);
        const [imgRequireURL, setImgRequire] = useState('../images/Avatar1.png')

     const select = (index) => {
             dispatchSelectCase(store.casesResp[index])
             navigation.navigate('CaseChat');
         }

     useEffect(()=>{
             if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar4.png'){

              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar1.png'){
              ref1.current.setNativeProps({
                                             display: 'flex'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar2.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar3.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
             else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar5.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar6.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'flex'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar7.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
      else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar8.png'){
                    ref1.current.setNativeProps({
                                                   display: 'none'
                                                });
                    ref2.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref3.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref4.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref5.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref6.current.setNativeProps({
                                                   display: 'none'
                                              });

                    ref7.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref8.current.setNativeProps({
                                                   display: 'flex'
                                              });
                    ref9.current.setNativeProps({
                                                   display: 'none'
                                              });
                    ref10.current.setNativeProps({
                                                   display: 'none'
                                              });
                   }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar9.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'flex'
                                        });
              ref10.current.setNativeProps({
                                             display: 'none'
                                        });
             }
else if(avatarArr[store.clientsResp.clients_avatar - 1] == '../images/Avatar10.png'){
              ref1.current.setNativeProps({
                                             display: 'none'
                                          });
              ref2.current.setNativeProps({
                                             display: 'none'
                                        });
              ref3.current.setNativeProps({
                                             display: 'none'
                                        });
              ref4.current.setNativeProps({
                                             display: 'none'
                                        });
              ref5.current.setNativeProps({
                                             display: 'none'
                                        });
              ref6.current.setNativeProps({
                                             display: 'none'
                                        });

              ref7.current.setNativeProps({
                                             display: 'none'
                                        });
              ref8.current.setNativeProps({
                                             display: 'none'
                                        });
              ref9.current.setNativeProps({
                                             display: 'none'
                                        });
              ref10.current.setNativeProps({
                                             display: 'flex'
                                        });
             }

      }, [])


    return (


          <View style={{flex:1, flexDirection: 'column', backgroundColor: "#4170f9"}}>
              <View style={{flex:1}}></View>
              <View style={{flex:2, flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'column'}}>
                   <Text></Text>
                </View>
                <View style={{flex:2, flexDirection:'column'}}>
                    <Image rounded  ref={ref1} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar1.png')} />
                    <Image rounded  ref={ref2} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar2.png')} />
                    <Image rounded  ref={ref3} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar3.png')} />
                    <Image rounded  ref={ref4} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar4.png')} />
                    <Image rounded  ref={ref5} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar5.png')} />
                    <Image rounded  ref={ref6} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar6.png')} />
                    <Image rounded  ref={ref7} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar7.png')} />
                    <Image rounded  ref={ref8} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar8.png')} />
                    <Image rounded  ref={ref9} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar9.png')} />
                    <Image rounded  ref={ref10} style={{width: 80, height: 80, display: 'none'}}  source={require('../images/Avatar10.png')} />

                </View>
                <View style={{flex:7, flexDirection:'column'}}>
                    <Text style={styles.welcome}>{store.clientsResp.clients_username}</Text>
                    <Text style={styles.instructions}>{store.clientsResp.clients_email}</Text>
                </View>
              </View>

              <View style={{flex:1, flexDirection:'row'}}>
                  <View style={{flex:1}}></View>
                  <View style={{flex:20}}>
                       <Text style={styles.title}>MIS CAUSAS</Text>
                  </View>
              </View>

              <View style={{flex:6, flexDirection:'row'}}>

                  <ScrollView>
                    {

                    store.casesResp.map((item, index)=>{
                                            return    <TouchableOpacity key={index} onPress={()=>{select(index)}}  style={styles.button}><Text style={{color: "white", fontSize: 25}}>{item.cases_matter}</Text></TouchableOpacity>

                                        })}
                  </ScrollView>

              </View>

              <View style={{flex:2, flexDirection: 'row'}}>
                <View style={{flex:5}}></View>
                <View style={{flex:2}}><Text></Text><Button onPress={()=>{navigation.navigate('Query')}} title="NUEVA CONSULTA" color="blue" type="clear" style={{width: 100, borderRadius: '100%'}}/></View>
                <View style={{flex:1}}></View>
              </View>

           </View>
    );
 // }
}


const styles = StyleSheet.create({
  instructions: {
    color: 'white',
    backgroundColor: "#4170f9",
    marginBottom: 0,
    borderColor: '#fff',
    fontSize:15,

  },
  title: {
      color: 'white',
      backgroundColor: "#4170f9",
      marginBottom: 0,
      borderColor: '#fff',
      fontSize:40,
      textAlign: 'center',
      margin:0,
      padding:0,
      fontWeight: 'bold'
  },
  welcome: {
      margin: 0,
      color: "white",
      fontSize: 30,

    },
    button: {
        alignItems: "center",
        backgroundColor: "#747A87",
        color: "red",
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 60,
      },
});

