import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../constants/themes'

const Line = () => {
  return (
    <View style={styles.line}>
      
    </View>
  )
}

export default Line

const styles = StyleSheet.create({
    line:{
        height:1,
        borderBottomWidth:2,
        borderBottomColor:COLORS.hrLine,
        width:"100%",
        marginTop:10,
        marginBottom:15,
        // opacity:0.2
    }
})