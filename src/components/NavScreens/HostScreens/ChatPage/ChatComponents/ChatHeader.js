import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { COLORS,SIZES } from '../../../../../constants/themes'

const ChatHeader = ({name,status,setOpenChat}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={()=>setOpenChat(false)}>
        <Icon name='chevron-left' size={25} color={COLORS.textLightGrey}/>
      </TouchableOpacity>
      <View style={styles.textCont}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>
            {
                status?
                "Äctive Now":
                "Last seen on Monday"
            }
        </Text>
      </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:'100%',
        paddingVertical:10
    },
    btn:{
        position:'absolute',
        left:'3%'
    },
    textCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    },
    name:{
      fontSize:SIZES.medium,
      color:COLORS.black,
      fontWeight:'600'
    },
    status:{
      fontSize:SIZES.small,
      color:COLORS.textLightGrey,
      fontWeight:'300',
      opacity:0.6
    }
})
