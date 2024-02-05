/**
 * @format
 */
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import 'react-native-polyfill-globals/auto';
import 'react-native-fetch-api';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState,useRef } from 'react';
import Main from './src/components/NavScreens/UserScreens/HotelsSearch/Main';
import BottomNav from './src/components/Navigation/BottomNav';
import Profile from './src/app/Profile';
import  Store  from './src/redux/store';
import { Provider } from 'react-redux';
import HostHome from './src/components/NavScreens/HostScreens/HostHome/HostHome';
import MenuPage from './src/components/NavScreens/HostScreens/MenuPage/MenuPage';
import Listings from './src/components/NavScreens/HostScreens/Listings/Listings';
import AllChats from './src/components/NavScreens/HostScreens/ChatPage/AllChats/AllChats';
import UserDetailDemo from './src/components/NavScreens/UserScreens/Profile/UserDetailDemo';
import Map from './src/components/NavScreens/UserScreens/Map/Map';
import Reels from './src/components/NavScreens/UserScreens/Reels/Reels';
import { User } from './src/declarations/User';
import { hotel } from './src/declarations/hotel';
import { backend } from './src/declarations/backend';
import PolyfillCrypto from 'react-native-webview-crypto'
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";
import {Actor, HttpAgent, toHex,fromHex} from "@dfinity/agent";
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {View, Text, StyleSheet, TouchableOpacity, Image,Modal,Linking, Platform, Alert} from 'react-native';
import { createActor } from './src/declarations/backend';
import { createActor as createUserActor } from './src/declarations/User';
import { createActor as createHotelActor } from './src/declarations/hotel';
import { createActor as createBookingActor } from './src/declarations/booking';
import { createActor as createReviewActor } from './src/declarations/Review';
import store from './src/redux/store';
import { setActor } from './src/redux/actor/actions';
import { setPrinciple } from './src/redux/principle/actions';
import { setUser } from './src/redux/users/actions';
import ChatContainer from './src/components/NavScreens/UserScreens/ChatPage/ChatContainer/ChatContainer';
import { idlFactory } from './Backend/RentSpace_backend/wallet/legder.did';
import { createTokenActor } from './src/components/NavScreens/UserScreens/HotelsSearch/HotelDetails/BookingForm/utils';
import { setAuthData } from './src/redux/authData/actions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {host, ids} from './DevelopmentConfig'


const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,

  requestPermissions: Platform.OS==="ios",
  channelId:'1',
});

const RootComponent: React.FC = () => {


  // const [loading,setLoading]
  const btmSheetLoginRef = useRef(null);
  const btmSheetFinishRef = useRef(null);
  const [middleKeyIdentity, setMiddleKeyIdentity] = useState('');



  async function delegationValidation(pubKey,priKey,delegation){
    // setLoading(true)
    try{
      let publicKey = await crypto.subtle.importKey("raw",
      Buffer.from(fromHex(pubKey)),
      { name: "ECDSA", namedCurve: "P-256" }, // Adjust the algorithm and curve as needed
      true, // Whether the key is extractable
      ["verify"] )
      // console.log("generateKey._keyPair.publicKey",publicKey)
      
      let privateKey = await crypto.subtle.importKey("pkcs8",
      Buffer.from(fromHex(priKey)),
      { name: "ECDSA", namedCurve: "P-256" }, // Adjust the algorithm and curve as needed
      true, // Whether the key is extractable
      ["sign"] )
      console.log("generateKey._keyPair.privateKey",privateKey)
      let newKeyPair = await ECDSAKeyIdentity.fromKeyPair({privateKey,publicKey})
      // console.log("newKeyPair",toHex(newKeyPair.getPublicKey().toDer()));
  
      const Delchain = DelegationChain.fromJSON(
          JSON.parse(decodeURIComponent(delegation)),
        );
        console.log("chain",Delchain);
        const middleIdentity = DelegationIdentity.fromDelegation(
          newKeyPair,
          Delchain,
        );
        console.log("middleIdentity",middleIdentity);
        const agent = new HttpAgent({identity: middleIdentity,fetchOptions: {
          reactNative: {
            __nativeResponseType: 'base64',
          },
        },
        callOptions: {
          reactNative: {
            textStreaming: true,
          },
        },
        fetch,
        blsVerify: () => true,
        host: host,
        verifyQuerySignatures: false,
      });
  
        // console.log("agent",agent);
  
        newActor = createActor(ids.backendCan, {
          agent,
        });
        // console.log("actor",newActor);
  
        console.log("middleIdentityy",middleIdentity.getPrincipal().toString())
  
        let principal = await newActor?.whoami().catch(async(err)=>{
          console.log(err)
          await AsyncStorage.clear()
          // setLoading(false)
          alert('no previous data found!')
        })
        if(principal=="2vxsx-fae"){
          await AsyncStorage.clear()
          // setLoading(false)
        }else{
          btmSheetLoginRef.current.dismiss()
        }
        let actorUser=createUserActor(ids.userCan,{agent})
        let actorHotel=createHotelActor(ids.hotelCan,{agent})
        let actorBooking=createBookingActor(ids.bookingCan,{agent})
        let actorToken=Actor.createActor(idlFactory, {
          agent,
          blsVerify:()=>true,
          canisterId:ids.tokenCan
        })
        let actorReview=createReviewActor(ids.reviewCan,{agent})
        // console.log("actor review : ",actorReview)
        store.dispatch(setActor({
          backendActor:newActor,
          userActor:actorUser,
          hotelActor:actorHotel,
          bookingActor:actorBooking,
          tokenActor:actorToken,
          reviewActor:actorReview
        })) 
        
        store.dispatch(setPrinciple(principal))
        console.log("user",principal)
      
  
        await actorUser?.getUserInfo().then((res)=>{
          if(res[0]?.firstName!=null){
            store.dispatch(setUser(res[0]))
            btmSheetLoginRef.current.dismiss()
            alert(`welcome back ${res[0]?.firstName}!`)
            
          }else{
            alert('Now please follow the registeration process!')
            btmSheetLoginRef.current.dismiss()
            btmSheetFinishRef.current.present()
          }
        }).catch((err)=>console.error(err))
        console.log("principal from new login : ",principal);
        
      }catch(err){
        console.log(err)
        alert("No previous data found!")
      }
    }


  const generateIdentity = async () => {
    let p = new Promise(async(resolve,reject)=>{
      await ECDSAKeyIdentity.generate({extractable: true})
      .then(async(res)=>{
        setMiddleKeyIdentity(res)
        console.log("generate key:",res)
        resolve(res)
      }
        )
      .catch((err)=>{
          console.log(err)
          reject(err)
          })
    })
    
   return p 
  };

  let resp;

  const handleLogin = async () => {
    
    await generateIdentity().then(async(res)=>{
      resp=res
    // console.log("running handle login",res)
    // console.log("ids : ",ids)
    try {
      // const url = `https://sldpd-dyaaa-aaaag-acifq-cai.icp0.io?publicKey=${toHex(res.getPublicKey().toDer())}`;
      const url = `http://127.0.0.1:4943/?canisterId=b77ix-eeaaa-aaaaa-qaada-cai&publicKey=${toHex(res.getPublicKey().toDer())}`;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Linking.addEventListener('url', handleDeepLink);
        await this.sleep(800);
      } else Linking.openURL(url);
    } catch (error) {console.log(error)}}).catch((err)=>{console.log(err)})
  };
  const handleDeepLink = async event => {
    let actor=backend
    const deepLink = event.url;
    const urlObject = new URL(deepLink);
    const delegation = urlObject.searchParams.get('delegation');
    	console.log("del signature",delegation)
    const chain = DelegationChain.fromJSON(
      JSON.parse(decodeURIComponent(delegation)),
    );
    const middleIdentity = DelegationIdentity.fromDelegation(
      resp,
      chain,
    );
    // console.log("middleID : ",middleIdentity)
    const agent = new HttpAgent({identity: middleIdentity,fetchOptions: {
      reactNative: {
        __nativeResponseType: 'base64',
      },
    },
    callOptions: {
      reactNative: {
        textStreaming: true,
      },
    },
    blsVerify: () => true,
    verifyQuerySignatures: false,
    host: host,});

    //New Login through api

    

    let pubKey = toHex(await crypto.subtle.exportKey("raw",middleIdentity._inner._keyPair.publicKey));
    let priKey = toHex(await crypto.subtle.exportKey("pkcs8",middleIdentity._inner._keyPair.privateKey));

    // delegationValidation(pubKey,priKey,delegation)

    //New Login through api end
    console.log(`new private : ${priKey}\n new public : ${pubKey}`)
    let signObj;
    async function getSignObject(){
      const principalM=middleIdentity.getPrincipal().toString()
      const encoder=new TextEncoder()
      let message=encoder.encode(principalM)
      let publicKey=toHex(middleIdentity.getPublicKey().toDer())
      // let pubKey = await crypto.subtle.exportKey('raw', middleIdentity._inner._keyPair.publicKey);
      let signature;
      let pubKey = toHex(await crypto.subtle.exportKey("raw",middleIdentity._inner._keyPair.publicKey));
    let priKey = toHex(await crypto.subtle.exportKey("pkcs8",middleIdentity._inner._keyPair.privateKey));
      // await middleIdentity.sign(message).then((res)=>{
      //   signature=res
      //   console.log(`principal : ${principalM} \n public key : ${toHex(publicKey)} \n signature : ${toHex(signature)}`)
        // console.log({
          // privateKey:priKey,
          // publicKey:pubKey,
          // delegation:delegation
        // })
        signObj=
        {
          privateKey:priKey,
          publicKey:pubKey,
          delegation:delegation
        }
        console.log(signObj)
      // }).catch((err)=>{console.log(err)})
      
    }
    await getSignObject().then(async()=>{
      console.log("getting sign obj : ",signObj)
      store.dispatch(
        setAuthData(signObj)
      )
      const baseUrl="http://localhost:5000"
      // const baseUrl="https://rentspace.kaifoundry.com"
      await axios.post(`${baseUrl}/api/v1/register/user`,{},{
        headers:{
          "x-private":signObj.privateKey,
          "x-public":signObj.publicKey,
          "x-delegation":signObj.delegation
        }
      }).then((res)=>{
        console.log("chat register resp : ",res)
      }).catch((err)=>{
        console.log("chat register error : ",err)
        if(err?.response?.data?.error=="User already exists"){
          console.log("chat user already exists!")
        }else{
          console.log("err resp : ",err?.response?.data?.error)
        }
      })
    })
    
    actor = createActor(ids.backendCan, {
      agent,
    });
    let actorUser=createUserActor(ids.userCan,{agent})
    let actorHotel=createHotelActor(ids.hotelCan,{agent})
    let actorBooking=createBookingActor(ids.bookingCan,{agent})
    let actorToken=Actor.createActor(idlFactory, {
      agent,
      blsVerify:()=>true,
      canisterId:ids.tokenCan
    })
    let actorReview=createReviewActor(ids.reviewCan,{agent})
    // console.log("actor review : ",actorReview)
    store.dispatch(setActor({
      backendActor:actor,
      userActor:actorUser,
      hotelActor:actorHotel,
      bookingActor:actorBooking,
      tokenActor:actorToken,
      reviewActor:actorReview
    }))
    
    // console.log("actor : ",actor)
    let whoami = await actor.whoami();
    store.dispatch(setPrinciple(whoami))
    console.log("user",whoami)
   

    await actorUser?.getUserInfo().then((res)=>{
      if(res[0]?.firstName!=null){
        store.dispatch(setUser(res[0]))
        btmSheetLoginRef.current.dismiss()
        alert(`welcome back ${res[0]?.firstName}!`)
        
      }else{
        alert('Now please follow the registeration process!')
        btmSheetLoginRef.current.dismiss()
        btmSheetFinishRef.current.present()
      }
    }).catch((err)=>console.error(err))
    // await AsyncStorage.setItem('user',JSON.stringify(middleIdentity))
    //   .then((res)=>console.log('data stored successfully',middleIdentity))
    //   .catch((err)=>console.log(err))
    //   alert(whoami);
      // getUserData()
  };

  return (
    <>
    <PolyfillCrypto/>
    <Provider store={Store}>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen options={{headerShown:false}} name="Launch" component={Main} initialParams={{handleLogin,btmSheetLoginRef,btmSheetFinishRef,delegationValidation
        }}/>
        <Stack.Screen options={{headerShown:false}} name='UserChat' component={ChatContainer} initialParams={{newChat:''}}/>
        <Stack.Screen options={{headerShown:false}} name='profile' component={UserDetailDemo} />
        <Stack.Screen options={{headerShown:false}} name='mapSearch' component={Map}/>
        <Stack.Screen options={{headerShown:false}} name='reels' component={Reels}/>
        <Stack.Screen options={{headerShown:false}} name='hostHome' component={HostHome}/>
        <Stack.Screen options={{headerShown:false}} name='hostMenu' component={MenuPage}/>
        <Stack.Screen options={{headerShown:false}} name='hostListing' component={Listings}/>
        <Stack.Screen options={{headerShown:false}} name='hostChat' component={AllChats}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
