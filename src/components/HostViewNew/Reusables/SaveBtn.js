import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../constants/themes'

const SaveBtn = ({setHostModal}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>{
        // setHostModal(0)
        alert("Please complete your listing first!")
      }}>
        <Text style={styles.btnText}>Save & exit</Text>
    </TouchableOpacity>
  )
}

export default SaveBtn

const styles = StyleSheet.create({
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:12,
        width:'30%',
        marginLeft:'7.5%',
        backgroundColor:'white',
        borderColor:COLORS.hostTitle,
        borderWidth:1.2,
        marginTop:20,
        borderRadius:15,
        marginBottom:20
    },
    btnText:{
        color:'black',
        fontWeight:'bold',
        fontSize:SIZES.preMedium
    }
})