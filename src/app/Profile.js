import {View, Text, StyleSheet, TouchableOpacity, Image,Modal} from 'react-native';
import React, {useEffect, useRef,useState} from 'react';
import {COLORS, SIZES} from '../constants/themes';
import {images} from '../constants';
import BottomNav from '../components/Navigation/BottomNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';


const Profile = ({navigation}) => {
    const goToMain=()=>{
        navigation.navigate('Launch')
    }
  return (
    <GestureHandlerRootView style={{flex: 1,paddingTop:200}}>
            <BottomNav 
                filterNav={goToMain}
                searchNav={goToMain}
                heartNav={goToMain}
                commentNav={goToMain}
                userNav={goToMain}/>
    </GestureHandlerRootView>
  )
}

export default Profile

const styles = StyleSheet.create({})