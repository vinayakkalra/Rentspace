import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomNav from '../../../Navigation/BottomNav'
import HeaderSearch from '../Reusables/Header/HeaderSearch'
import { SIZES } from '../../../../constants/themes'
import MapScreen from './MapScreen'

const Map = ({navigation}) => {
  return (
    <View style={styles.view}>
      <HeaderSearch map={true}/>
      <MapScreen/> 
      <BottomNav navigation={navigation}/>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%'
    },
    simpleText:{
        color:'black',
        fontSize:SIZES.medium,
    }
})