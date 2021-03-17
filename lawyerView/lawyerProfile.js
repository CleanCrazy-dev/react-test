import React, { Component, useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  List,
  TextInput,
  FormLabel,
  FormInput,
  FormValidationMessage,
  ScrollView,
  PanResponder,
} from "react-native";
import {
  ThemeProvider,
  Avatar,
  Card,
  ListItem,
  Icon,
  FlatList,
} from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions, AppState } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import BackgroundTimer from "react-native-background-timer";
import { useSelector, useDispatch } from "react-redux";
import {
  dispatchListOfCases,
  dispatchSelectCase,
} from "../redux/dispatcher.js";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase"; //https://www.youtube.com/watch?v=ACLzAL2JDxk

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyA4FFuyAX6bXNQcng34oYoHwvN22kIKPVY",
  authDomain: "legalisapp-42218.firebaseapp.com",
  projectId: "legalisapp-42218",
  storageBucket: "legalisapp-42218.appspot.com",
  messagingSenderId: "528237277754",
  appId: "1:528237277754:web:ca727e985f1986a6eb7b03",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// DEVICE SIZE
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const windowHeightPercentUnit = parseInt(windowHeight / 100);
const windowWidthPercentUnit = parseInt(windowWidth / 100);

export default function LawyerProfile({ navigation }) {
  //REDUX STATE
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [asyncStore, setAsyncStore] = useState([]); //THIS REPLACE THE USESELECTOR
  const [cases, setCases] = useState([]);
  const [casesCounting, setCasesCounting] = useState(0);
  const [notificationToken, setNotificationToken] = useState([]);
  const [randomIcon, setRandomIcon] = useState("");

  useEffect(() => {
    //THIS USEFFECT IS ACTIVATED WHEN THE CASES DATA COME AND IS STORED AS ASYN STORE DATA

    let casesTracker = setInterval(() => {
      let arrayOfCasesAndQueries = [];
      let lawyerId;
      asyncStore.lawyers_id == 2 ? (lawyerId = 2) : (lawyerId = 1); // PREVENT THE URL IF THE LAWYERS IS FROM ADVICE OR COMMOND LAWYER

      let filteredArrayOfCasesAndQueries = []; // WE GET A NON FILTERED DATA FROM BACKEND, WE ERRASE THE REMINDED DATA, MAY BE THIS WIL BE CHANGED FOR MORE EFFICENCY
      fetch("http://patoexer.pythonanywhere.com/userByLawyers/" + lawyerId) // WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER, BUT FILTERED BY FIELD SPECIALTY
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          arrayOfCasesAndQueries.push(...data.resp);
          arrayOfCasesAndQueries.forEach((item, index) => {
            if (asyncStore.lawyers_id != 2) {
              if (
                item.users_issue_subject.toLowerCase() ==
                asyncStore.lawyers_field.toLowerCase()
              ) {
                filteredArrayOfCasesAndQueries.push(item);
              }
            } else if (asyncStore.lawyers_id == 2) {
              filteredArrayOfCasesAndQueries.push(item);
            }
          });

          dispatchListOfCases(filteredArrayOfCasesAndQueries);
          setCases(filteredArrayOfCasesAndQueries);
        })
        .catch((error) => console.log(error));
      /*fetch("http://patoexer.pythonanywhere.com/lawyerCases/" + store.userData.lawyers_id)//WE GET ALL LAWYER'S CASES
                                                                 .then(response => response.json())
                                                                 .then((data)=>{
                                                                    alert("dsd")
                                                                  //arrayOfCasesAndQueries.push(...data.resp)


                                                                 fetch("http://patoexer.pythonanywhere.com/userByLawyers/1")// WE GET ALL NEW CLIENTS NOT TAKEN BY ANY OTHER LAWYER
                                                                                                     .then(response =>{ response.json()})
                                                                                                     .then((data)=>{ //alert("rgtgtgr")

                                                                                                     arrayOfCasesAndQueries.push(...data.resp)

                                                                                                     setCases(arrayOfCasesAndQueries)
                                                                                                     dispatchListOfCases(arrayOfCasesAndQueries)




                                                                                                     })
                                                                                                     .catch(error => console.log(error))

                                                                 })
                                                                 .catch(error => console.log(error))*/
    }, 3000);
  }, [asyncStore]);

  useEffect(() => {
    showAsyncStorageData();

    //RANDOM ICON ON PROFILE ONLY FOR JOKE

    let randomIconArr = [
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "bug" },
      { type: "octicon", icon: "law" },
      { type: "font-awesome", icon: "rocket" },
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "octoface" },
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "law" },
      { type: "octicon", icon: "law" },
    ];
    let randomPosition = Math.floor(Math.random() * 10);
    setRandomIcon(randomIconArr[randomPosition]);

    return () => {
      //clearInterval(casesTracker);
      dispatch({ type: "USERDATA", doneAction: "" });
    };
  }, []);

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      console.log("BackgroundTimer is working!!!");
    }, 1000);
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);
  const showAsyncStorageData = async () => {
    try {
      let name = AsyncStorage.getItem("lawyerSession").then((value) => {
        value = JSON.parse(value);
        //THE RETRIVED DATA IS STORED ON COMPONENT HOOK
        setAsyncStore(value);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Data removed");
      navigation.navigate("Home");
    } catch (exception) {
      return false;
    }
  };

  const getNotificactionToken = async () => {
    // THIS ASYNC FUNCTION INSERT INTO FIREBASE DATABASE THE TOKEN OF NOTIFICATION
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log(existingStatus);
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    token = JSON.stringify(token.data).slice(1, -1);

    notify(token);
    //setNotificationToken(token)

    if (token) {
      //WE SEND TO FIREBASE BAKEND THE TOKEN
      const resp = await firebase
        .firestore()
        .collection("1")
        .doc("Q6vBYWYcUrAnlxNYBkji")
        .set({ token }, { merge: true });
    }
  };

  const notify = (token) => {
    // THIS ASYNC FUNCTION EXECUTE THE NOTIFICATION ITSELF ON THE DEVICE, REMEMBER DEVICE SIMULATORS DO NOT SHOW NOTIFICATION, THEY ARE NOT SUPPORTED

    const message = {
      to: token, //"ExponentPushToken[J7t6TCPxhGT-GG5R6WGEeI]",
      title: "LEGALIS",
      body: "Un nuevo cliente te esta esperando",
      sound: "default",
      ios: { _displayInForeground: true },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    };

    fetch("https://exp.host/--/api/v2/push/send", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("resp: " + JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectCase = (index) => {
    dispatchSelectCase(store.listOfCases[index]);

    if (
      "users_name" in store.listOfCases[index] &&
      store.listOfCases[index].taken == false
    ) {
      // BECAUSE IT'S A USER, IT HAVE TO MARK IT AS TAKEN, FOR ANY ANOTHER LAWYER TAKE THE USER

      let updateUserData = {
        lawyer_id: store.userData.lawyers_id,
        taken: 1,
      };

      let options = {
        method: "PUT",
        body: JSON.stringify(updateUserData),
        headers: { "Content-Type": "application/json" },
      };

      fetch(
        "http://patoexer.pythonanywhere.com/user/" +
          store.listOfCases[index].users_id,
        options
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          navigation.navigate("LawyerCaseChat");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    } else {
      navigation.navigate("LawyerCaseChat");
    }
  };

  return (
    <ImageBackground
      source={require("../images/lawyerProfile.png")}
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        resizeMode: "stretch",
        resizeMode: "cover",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "transparent",
          paddingTop: windowHeightPercentUnit * 5,
        }}
      >
        <Text
          style={{ color: "#4170f9", padding: "5%" }}
          onPress={() => {
            removeItemValue("lawyerSession");
          }}
        >
          Cerrar Sesión
        </Text>
        <View style={{ flex: windowHeightPercentUnit }}></View>
        <View
          style={{ flex: windowHeightPercentUnit * 4, flexDirection: "row" }}
        >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text> </Text>
          </View>
          <View style={{ flex: 2, flexDirection: "column" }}>
            {Platform.OS === "ios" ? (
              <Icon
                rounded
                color="#4170f9"
                size={60}
                name={randomIcon.icon}
                type={randomIcon.type}
              />
            ) : (
              <Icon
                rounded
                size={60}
                color={"blue"}
                name={randomIcon.icon}
                type={randomIcon.type}
              />
            )}
          </View>
          <View style={{ flex: 7, flexDirection: "column" }}>
            <Text style={styles.welcome}>{asyncStore.lawyers_name}</Text>
            <Text style={styles.instructions}>{asyncStore.lawyers_email}</Text>
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 30 }}>
              <View style={{ flex: 10, borderRadius: 10 }}>
                <View style={{ borderRadius: 10, backgroundColor: "#3b2960" }}>
                  <Text
                    style={[
                      styles.instructions,
                      { padding: 10, color: "white" },
                    ]}
                  >
                    GASTO MENSUAL: ${asyncStore.lawyers_spending}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 3 }}></View>
            </View>
          </View>
        </View>

        <View style={{ flex: windowHeightPercentUnit, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text onPress={() => showAsyncStorageData()} style={styles.title}>
              SOLICITUDES
            </Text>
          </View>
        </View>

        <View
          style={{ flex: windowHeightPercentUnit * 9, flexDirection: "row" }}
        >
          <ScrollView>
            {cases.map((item, index) => {
              if (!item.taken) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectCase(index);
                    }}
                    key={index}
                    style={
                      "cases_id" in item
                        ? styles.button
                        : [
                            styles.newUser,
                            {
                              marginLeft: windowWidthPercentUnit * 15,
                              marginRight: windowWidthPercentUnit * 15,
                            },
                          ]
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottomColor: "#3e6de3",
                        borderBottomWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          flex: 2,
                          color: "#7194eb",
                          fontSize: windowWidthPercentUnit * 6,
                          padding: 10,
                        }}
                      >
                        {"cases_id" in item
                          ? item.client_name
                          : item.users_name}
                      </Text>
                      <View style={{ flex: 1, borderRadius: 10, padding: 10 }}>
                        <View
                          style={{
                            borderRadius: 10,
                            backgroundColor: "#2ec5f9",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontSize: windowHeightPercentUnit * 2,
                              fontWeight: "bold",
                            }}
                          >
                            NUEVO
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          padding: 10,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#7194eb",
                          fontSize: windowWidthPercentUnit * 3,
                        }}
                      >
                        {"cases_id" in item
                          ? item.cases_matter.toUpperCase()
                          : item.users_issue_subject.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView>
        </View>
        <Text></Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  instructions: {
    color: "#4170f9",
    backgroundColor: "transparent",
    marginBottom: 0,
    borderColor: "#fff",
    fontSize: windowHeightPercentUnit * 2,
  },
  title: {
    color: "white",
    backgroundColor: "transparent",
    marginBottom: 0,
    borderColor: "#fff",
    fontSize: windowHeightPercentUnit * 4,
    textAlign: "center",
    margin: 0,
    padding: 0,
    fontWeight: "bold",
  },
  welcome: {
    margin: 0,
    color: "#4170f9",
    fontWeight: "bold",
    fontSize: windowHeightPercentUnit * 4,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#747A87",
    padding: 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 60,
    borderRadius: 10,
  },
  newUser: {
    backgroundColor: "#ffffff",
    padding: 0,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: windowHeightPercentUnit * 15,
    borderRadius: 10,
  },
});
