import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'
import { COLORS,SIZES } from '../../../../../constants/themes'
import HeaderTitles from './HeaderTitles'

const HeaderSearch = ({filterAction,map}) => {
  return (
    <View style={map?[styles.headerCont]:[styles.headerCont,{paddingBottom:20}]}>
      <SearchBar filterAction={filterAction}/>
      {
        map?<HeaderTitles/>:<></>
      }
      
    </View>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({
    headerCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:COLORS.darkPurple,
        paddingTop:20,
    }
})