import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'


const IdentityCard = ({setIdprocess}) => {
  
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <Text style={styles.textBold}>Verify your identity</Text>
        <Text style={[styles.textNormal,{color:'red',opacity:1}]}>required to publish</Text>
        <Text style={styles.textNormal}>Listing</Text>
        <TouchableOpacity onPress={()=>setIdprocess(1)}>
        <Text style={styles.textUnderline}>Get started</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.iconCont}>
        <Icon name='exclamationcircleo' color={'red'} size={23}/>
      </View>
      
    </View>
  )
}

export default IdentityCard

const styles = StyleSheet.create({
    card:{
        width:'85%',
        backgroundColor:'white',
        elevation:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5,
        marginLeft:'5%',
        borderRadius:15,
        paddingVertical:10,
        marginBottom:10
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        paddingLeft:20
    },
    iconCont:{
        marginRight:10,
        height:'85%',
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    textBold:{
        fontSize:SIZES.preMedium,
        fontWeight:'500',
        color:COLORS.black,
        marginVertical:3
    },
    textNormal:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        opacity:0.5,
        marginVertical:3
    },
    textUnderline:{
        fontSize:SIZES.preMedium,
        textDecorationLine:'underline',
        color:COLORS.textLightGrey,
        marginVertical:3
    }
})