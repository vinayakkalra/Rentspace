import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BottomNavHost from '../../../../Navigation/BottomNavHost'
import { COLORS, SIZES } from '../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'

const ChatDrawer = ({navigation,showDrawer,setShowDrawer}) => {
  const [color,setColor]=useState({color:'black',bg:'white'})
  return (
    <>
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Inbox</Text>
        <TouchableOpacity onPress={()=>{setShowDrawer(false)}}>
          <Icon name='cross' size={30} color={COLORS.textLightGrey}/>
        </TouchableOpacity>
        
      </View>
      <View style={styles.contentCont}>
        <TouchableOpacity style={[styles.contentBtn,{backgroundColor:color.bg}]} onPress={
          ()=>{
            setColor({bg:COLORS.hostTitle,color:'white'})
            setShowDrawer(false)
            navigation.navigate('hostChat')
          }
        }>
          <Text style={[styles.contents,{color:color.color}]}>All messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBtn}>
          <Text style={styles.contents}>Rentspace support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBtn}>
          <Text style={styles.contents}>Archive</Text>
        </TouchableOpacity> 
      </View>
      <View style={styles.line}/>
      <Text style={styles.subHeading}>Settings</Text>
      <View style={styles.contentCont}>
        <TouchableOpacity style={styles.contentBtn}>
          <Text style={styles.contents}>Quick replies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contentBtn}>
          <Text style={styles.contents}>Scheduled messages</Text>
        </TouchableOpacity> 
      </View>
    </View>
    <BottomNavHost navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
    <View style={styles.transparent}/>
    </>
  )
}

export default ChatDrawer

const styles = StyleSheet.create({

    view:{
        backgroundColor:'white',
        width:'70%',
        height:'92%',
        elevation:3,
        borderTopRightRadius:15,
        borderBottomRightRadius:15,    
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        paddingLeft:'5%'
    },
    transparent:{
      position:'absolute',
      backgroundColor:COLORS.textLightGrey,
      right:0,
      top:0,
      width:"35%",
      height:'92%',
      opacity:0.4,
      zIndex:-1
    },
    header:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:40,
      width:'90%'
    },
    title:{
      color:COLORS.black,
      fontSize:SIZES.medxLarge-1,
      fontWeight:'600'
    },
    contentCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      width:'100%'
    },
    contents:{
      color:COLORS.black,
      fontSize:SIZES.medium+2,
    },
    contentBtn:{
      borderRadius:12,
      paddingHorizontal:8,
      paddingVertical:8,
      display:'flex',
      marginVertical:5,
      width:'90%'
    },
    subHeading:{
      color:COLORS.black,
      fontSize:SIZES.preMedium,
      marginBottom:10
    },
    line:{
      width:'90%',
      backgroundColor:COLORS.textLightGrey,
      height:1,
      opacity:0.1,
      marginVertical:20
    }
})