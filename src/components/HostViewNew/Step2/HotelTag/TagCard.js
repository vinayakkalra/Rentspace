import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SIZES,COLORS } from '../../../../constants/themes'

const TagCard = ({text}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default TagCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:1,
        borderColor:COLORS.textLightGrey,
        borderRadius:30,
        marginRight:20,
        marginBottom:10
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:'bold',
    },
    
})