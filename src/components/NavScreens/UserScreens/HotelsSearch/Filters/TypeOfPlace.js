import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Heading from './ReUsables/Heading'
import Tagline from './ReUsables/Tagline'
import { COLORS, SIZES } from '../../../../../constants/themes'

const TypeOfPlace = () => {
  const [index,setIndex]=useState(0)
  return (
    <View style={styles.sec}> 
      <Heading text={"Type of place"}/>
      <Tagline text={"Search rooms, entire house or any type of place."}/>
      <View style={styles.btnCont}>
        <TouchableOpacity 
            onPress={()=>setIndex(0)}
            style={(index==0)?[styles.btnSelected,styles.btnLeft]:[styles.btn,styles.btnLeft]}
        >
          <Text style={(index==0)?styles.btnTextSelected:styles.btnText}>Any Type</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>setIndex(1)}
          style={(index==1)?styles.btnSelected:styles.btn}
        >
          <Text style={(index==1)?styles.btnTextSelected:styles.btnText}>Room</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={()=>setIndex(2)}
          style={(index==2)?[styles.btnSelected,styles.btnRight]:[styles.btn,styles.btnRight]}
        >
          <Text style={(index==2)?styles.btnTextSelected:styles.btnText}>Any Type</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TypeOfPlace

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
        marginVertical:20
    },
    btnCont:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      height:70,
      marginVertical:15
    },
    btnSelected:{
      height:'100%',
      width:'33.3%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:COLORS.hostTitle
    },
    btn:{
      height:'100%',
      width:'33.3%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'white',
      borderWidth:1,
      borderColor:COLORS.hostTitle
    },
    btnTextSelected:{
      color:'white',
      fontSize:SIZES.preMedium,
      fontWeight:'300'
    },
    btnText:{
      color:COLORS.hostTitle,
      fontSize:SIZES.preMedium,
      fontWeight:'300'
    },
    btnLeft:{
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,
      borderRightWidth:0
    },
    btnRight:{
      borderTopRightRadius:20,
      borderBottomRightRadius:20,
      borderLeftWidth:0
    }
})