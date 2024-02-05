import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'

const BottomBotton = ({title,onClick}) => {
  return (
    <View style={styles.cont}>
      <TouchableOpacity style={styles.btn} onPress={onClick}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomBotton

const styles = StyleSheet.create({
    cont:{
        isplay:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white',
        elevation:15,
        width:'100%',
        paddingVertical:20,
        position:'absolute',
        bottom:0,
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'90%',
        paddingVertical:15,
        backgroundColor:COLORS.hostTitle,
        borderRadius:10,
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'white'
    }
})