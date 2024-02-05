import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS,SIZES } from '../../../constants/themes'

const UploadTemp = ({setHostModal,pos}) => {

    useEffect(()=>{
        setTimeout(()=>{setHostModal(pos+1)},3000)
    },[])
    
  return (
    <View style={styles.view}>
      <Text style={styles.title}>
      Magically arranging your photos to show off your space
      </Text>
      <Text style={styles.text}>0 of 5 uploaded</Text>
    </View>
  )
}

export default UploadTemp

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'88%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:30,
        marginTop:'50%',
        textAlign:'center'
    },
    text:{
        color:'black',
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    }
})