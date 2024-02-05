import { StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'
import { COLORS } from '../../../../../constants/themes'

const TypingField = ({setMessages,messages,setMessage,message,sendMessage}) => {



  return (
    <View style={styles.field}>
      <TextInput 
       style={styles.input}
       placeholder='Type Your Message'
       placeholderTextColor={COLORS.textLightGrey}
       multiline={true}
       cursorColor={COLORS.hostTitle}
       value={message}
       onChangeText={value=>setMessage(value)}
      />
      <TouchableOpacity style={styles.icon} onPress={sendMessage}>
        <Icon name='location-arrow' color={COLORS.hostTitle} size={30}/>
      </TouchableOpacity>
      
    </View>
  )
}

export default TypingField

const styles = StyleSheet.create({
    field:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'flex-start',
        backgroundColor:'white',
        alignItems:'center',
        position:'absolute',
        bottom:0,
        paddingHorizontal:'4%',
        elevation:10
    },
    input:{
        width:'85%',
        marginRight:10,
        color:COLORS.textLightGrey
    },
    inputText:{

    },
    icon:{
        width:'8%'
    }
})