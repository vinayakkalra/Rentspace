import {View, Text, StyleSheet, TouchableOpacity, Image,Modal,Linking, Platform, Alert} from 'react-native';
import React, {useEffect, useRef,useState} from 'react';
import {COLORS, SIZES} from '../constants/themes';
import BottomNav from '../components/Navigation/BottomNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetLogin from '../components/BottomSheets/BottomSheetLogin';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetFinishSignUp from '../components/BottomSheets/BottomSheetFinishSignUp';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import BottomSheetCommunity from '../components/BottomSheets/BottomSheetCommunity';
import BottomSheetNotification from '../components/BottomSheets/BottomSheetNotification';
import SplashScreen from 'react-native-splash-screen';
import BottomSheetDetails from '../components/BottomSheets/BottomSheetDetails';
import ModalSafety from '../components/Modals/hotelDetailSubSections/ModalSafety';
import ModalCancellation from '../components/Modals/hotelDetailSubSections/ModalCancellation';
import ModalHouseRules from '../components/Modals/hotelDetailSubSections/ModalHouseRules';
import HeaderSearch from '../components/Header/HeaderSearch';
import UserDetailDemo from '../components/Modals/UserDetailDemo';
import BookHotelPage from '../components/NavScreens/BookHotelPage';
import UpdateProfile from '../components/Modals/UpdateProfile';
import HotelCreationForm from '../components/Modals/HotelCreationForm';
import HotelDetailPage from '../components/Modals/hotelDetailSubSections/HotelDetailPage';
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";
import {HttpAgent, toHex} from "@dfinity/agent";
import { createActor,backend } from '../declarations/backend';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../redux/users/actions';
import { setPrinciple } from '../redux/principle/actions';
import { setActor} from '../redux/actor/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
const flatted=require('flatted')

import PolyfillCrypto from 'react-native-webview-crypto'
global.Buffer = require('buffer').Buffer;

const Main = ({navigation}) => {

  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.userReducer)
  const {hotels}=useSelector(state=>state.hotelsReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  //States for managing modals
  const [safetyModal, setSafetyModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [hotelCreateForm, setHotelCreateForm] = useState(false);
  const [hotelDetailPage, openHotelDetailPage] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  const getUserAgent=async()=>{
    await AsyncStorage.getItem('user').then(async(res)=>{
      console.log('getting id : ',res)
      try{
      if(res==null){
        btmSheetLoginRef.current.present()
        AsyncStorage.clear()
      }else{
        const agent = new HttpAgent({identity: res,fetchOptions: {
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
        host: 'http://127.0.0.1:4943',});
        
        actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
          agent,
        });
        let actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
          agent,
        });
        let actorUser=createActor('br5f7-7uaaa-aaaaa-qaaca-cai',{agent})
        let actorHotel=createActor('bw4dl-smaaa-aaaaa-qaacq-cai',{agent})
        // dispatch(setActor({
        //   backendActor:actor,
        //   userActor:actorUser,
        //   hotelActor:actorHotel
        // }))
    
        let whoami = await actor.whoami();
        console.log("whoami",whoami);
        dispatch(setPrinciple(whoami))
        alert(whoami);
        getUserData()
      }
    }catch(err){console.log(err)}
    }).catch((err)=>{console.log(err)})
  }

  useEffect(() => {
    SplashScreen.hide();
    // getUserAgent()
    btmSheetLoginRef.current.present()
    generateIdentity();
  },[])

  //Refs for managing bottomsheets
  const btmSheetLoginRef = useRef(null);
  const btmSheetFinishRef = useRef(null);
  const btmSheetCommRef = useRef(null);
  const btmSheetNotiRef = useRef(null);
  const btmExtraDetailsRef = useRef(null);
  const btmUserDetailsRef = useRef(null);
  const snapPoints = ['94%'];
  const handlePresentModal = () => {
    btmSheetLoginRef.current.present();
  };

  
  const [middleKeyIdentity, setMiddleKeyIdentity] = useState('');
  const generateIdentity = async () => {
    await ECDSAKeyIdentity.generate({extractable: true})
    .then(async(res)=>{
      setMiddleKeyIdentity(res)
    }
      )
    .catch((err)=>console.log(err))
  };
  const getUserData=async()=>{
    
    // console.log(actors)
    await actors.userActor?.getUserInfo().then((res)=>{
      if(res[0].firstName!=''){
        dispatch(setUser(res[0]))
        btmSheetLoginRef.current.dismiss()
        alert(`welcome back ${res[0].firstName}!`)
        
      }else{
        alert('Now please follow the registeration process!')
        btmSheetLoginRef.current.dismiss()
        btmSheetFinishRef.current.present()
      }
    }).catch((err)=>console.error(err))
    // await AsyncStorage.clear()
  }

  const handleLogin = async () => {
    try {
      const url = `http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&publicKey=${toHex(middleKeyIdentity.getPublicKey().toDer())}`;
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
    } catch (error) {}
  };
  const handleDeepLink = async event => {
    let actor=backend
    const deepLink = event.url;
    const urlObject = new URL(deepLink);
    const delegation = urlObject.searchParams.get('delegation');

    const chain = DelegationChain.fromJSON(
      JSON.parse(decodeURIComponent(delegation)),
    );
    const middleIdentity = DelegationIdentity.fromDelegation(
      middleKeyIdentity,
      chain,
    );
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
    host: 'http://127.0.0.1:4943',});
    actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
      agent,
    });
    let actorUser=createActor('br5f7-7uaaa-aaaaa-qaaca-cai',{agent})
    let actorHotel=createActor('bw4dl-smaaa-aaaaa-qaacq-cai',{agent})
    // dispatch(setActor({
    //   backendActor:actor,
    //   userActor:actorUser,
    //   hotelActor:actorHotel
    // }))

    let whoami = await actor.whoami();
    console.log("whoami",whoami);
    dispatch(setPrinciple(whoami))
    await AsyncStorage.setItem('user',JSON.stringify(middleIdentity))
      .then((res)=>console.log('data stored successfully',middleIdentity))
      .catch((err)=>console.log(err))
      alert(whoami);
      getUserData()
  };

  //methods for opening and closing bottomsheets
  const closeModal = valRef => {
    valRef.current.dismiss();
  };
  const openFinishSignUp = () => {
    btmSheetFinishRef.current.present();
  };
  const openComm = () => {
    btmSheetCommRef.current.present();
  };
  const openNotiModal = () => {
    btmSheetNotiRef.current.present();
  };
  const openDetailsModal = () => {
    btmExtraDetailsRef.current.present();
  };

  return (
    // Necessary for capturing touch gestures in the screen
    <GestureHandlerRootView style={{flex: 1, paddingTop: 200}}>
      <BottomSheetModalProvider>
        {/* Modals Defined */}
        <PolyfillCrypto/>

        <Modal visible={safetyModal} animationType="fade">
          <ModalSafety setSafetyModal={setSafetyModal} />
        </Modal>

        <Modal visible={cancelModal} animationType="fade">
          <ModalCancellation setCancelModal={setCancelModal} />
        </Modal>

        <Modal visible={rulesModal} animationType="fade">
          <ModalHouseRules setRulesModal={setRulesModal} />
        </Modal>
        <Modal visible={updatePage} animationType="slide">
          <UpdateProfile setUpdatePage={setUpdatePage} />
        </Modal>
        <Modal visible={hotelCreateForm} animationType="slide">
          <HotelCreationForm setHotelCreateForm={setHotelCreateForm} />
        </Modal>
        <Modal visible={hotelDetailPage} animationType="slide">
          <HotelDetailPage openHotelDetailPage={openHotelDetailPage} />
        </Modal>
        <Modal visible={userDetails} animationType="slide">
          <UserDetailDemo
            setUpdatePage={setUpdatePage}
            self={setUserDetails}
            setHotelCreateForm={setHotelCreateForm}
          />
        </Modal>

        {/* navigation Bar */}
        <BottomNav
          filterNav={openFinishSignUp}
          searchNav={openDetailsModal}
          heartNav={() => {
            console.log('clicked!');
          }}
          commentNav={openHotelDetailPage}
          userNav={() => {
            setUserDetails(true);
          }}
        />

        {/* searchBar Top */}
        <HeaderSearch />

        {/* <UserDetailDemo user={user}/> */}
        <BookHotelPage
          setUpdatePage={setUpdatePage}
          openHotelDetailPage={openHotelDetailPage}
        />

        {/* BottomSheets */}
        <BottomSheetModal
          ref={btmSheetLoginRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetLogin handleLogin={handleLogin} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetFinishRef}
          index={0}
          enablePanDownToClose={false}
          snapPoints={snapPoints}>
          <BottomSheetFinishSignUp
            openComm={openComm}
            closeModal={() => {
              closeModal(btmSheetFinishRef);
            }}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetCommRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetCommunity
            selfMod={btmSheetCommRef}
            openNotiModal={openNotiModal}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetNotiRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetNotification self={btmSheetNotiRef} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmExtraDetailsRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetDetails />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 30,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },
  btnText: {
    color: COLORS.inputBorder,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
});
