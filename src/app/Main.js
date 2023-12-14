import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES} from '../constants/themes';
import {images} from '../constants';
import BottomNav from '../components/BottomNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetLogin from '../components/BottomSheetLogin';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetFinishSignUp from '../components/BottomSheetFinishSignUp';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import BottomSheetCommunity from '../components/BottomSheetCommunity';
import BottomSheetNotification from '../components/BottomSheetNotification';
import SplashScreen from 'react-native-splash-screen';
import BottomSheetDetails from '../components/BottomSheetDetails';
import ModalSafety from '../components/ModalSafety';
import ModalCancellation from '../components/ModalCancellation';
import ModalHouseRules from '../components/ModalHouseRules';
import SearchBar from '../components/SearchBar';
import HeaderSearch from '../components/HeaderSearch';
import MapScreen from '../components/MapScreen';
import UserDetailDemo from '../components/UserDetailDemo';
import BookHotelPage from '../components/BookHotelPage';
import UpdateProfile from '../components/UpdateProfile';
import HotelCreationForm from '../components/HotelCreationForm';
import HotelDetailPage from '../components/HotelDetailPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";
import {HttpAgent} from "@dfinity/agent";
import { createActor,backend } from '../declarations/backend';

const Main = ({navigation}) => {
  //States for managing modals
  const [safetyModal, setSafetyModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [hotelCreateForm, setHotelCreateForm] = useState(false);
  const [hotelDetailPage, openHotelDetailPage] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  //Hiding splashscreen and opening sign up page
  useEffect(() => {
    SplashScreen.hide();
    // btmSheetFinishRef.current.present()
    btmSheetLoginRef.current.present();
  }, []);

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

  useEffect(() => {
    generateIdentity();
  }, []);

  const [middleKeyIdentity, setMiddleKeyIdentity] = useState('');
  const generateIdentity = async () => {
    middleKeyIdentity = await ECDSAKeyIdentity.generate({extractable: true});
    setMiddleKeyIdentity(middleKeyIdentity);
  };

  const handleLogin = async () => {
    // btmSheetLoginRef.current.dismiss();
    // btmSheetFinishRef.current.present();
    try {
      const url = `http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai?publicKey=${middleKeyIdentity
        .getPublicKey()
        .toDer()}`;
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
    let actor = backend;
    const deepLink = event.url;
    const urlObject = new URL(deepLink);
    const delegation = urlObject.searchParams.get('delegation');
    console.log(delegation);
    // Handle the deep link as needed
    // For example, parse the deep link and navigate to the appropriate screen
    // let encoded=decodeURIComponent(deepLink)
    // console.log('Deep link received:', JSON.stringify(encoded));
    // console.log('Deep link received:', deepLink.json);
    console.log('before middleKeyIdentity');
    // var middleKeyIdentity = await ECDSAKeyIdentity.generate().catch((err)=>console.log(err))
    // console.log( "middleIdentity",middleKeyIdentity)

    const chain = DelegationChain.fromJSON(
      JSON.parse(decodeURIComponent(delegation)),
    );
    console.log('chain', chain);
    const middleIdentity = DelegationIdentity.fromDelegation(
      middleKeyIdentity,
      chain,
    );
    console.log('middleIdentity', middleIdentity.getPrincipal().toString());
    const agent = new HttpAgent({identity: middleIdentity});
    // alert("agent 1",agent)
    actor = createActor('be2us-64aaa-aaaaa-qaabq-cai', {
      agent,
    });

    let whoami = await actor.whoami();
    console.log(whoami);
    alert(whoami);
  };

  //methods for opening and closing bottomdsheets
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
        {/* <MapScreen/> */}

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
