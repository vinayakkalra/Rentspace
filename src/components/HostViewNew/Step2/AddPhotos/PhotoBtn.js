import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'

const PhotoBtn = ({text,icon,onClick}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onClick}>
        {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default PhotoBtn

const styles = StyleSheet.create({
    btn:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        borderColor:COLORS.hostTitle,
        borderWidth:1.2,
        borderRadius:10,
        width:'77%',
        marginLeft:'8%',
        height:80,
        marginTop:10,
        paddingHorizontal:20
    },
    text:{
        fontSize:SIZES.small,
        fontWeight:'bold',
        color:'black',
        marginLeft:12
    },
})