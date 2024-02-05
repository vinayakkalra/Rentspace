import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../constants/themes'

const Line = () => {
  return (
    <View style={styles.line}/>
  )
}

export default Line

const styles = StyleSheet.create({
    line:{
        width:'100%',
        height:1,
        backgroundColor:COLORS.textLightGrey,
        opacity:0.2
    }
})