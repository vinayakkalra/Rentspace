import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'

const IconCard = ({el,text}) => {
  return (
    <TouchableOpacity style={styles.card}>
      {el}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default IconCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    text:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        fontWeight:'bold',
        marginTop:2
    }
})