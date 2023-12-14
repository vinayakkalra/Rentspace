import { Dimensions, StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import {COLORS, SIZES} from '../constants/themes'
import {images} from '../constants'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
// const {height:SCREEN_HEIGHT}=Dimensions.get('window')

const BottomSheetLogin = ({handleLogin}) => {

  const loginMethods=[
    {title:"Astrox",logo:images.astroX},
    {title:"Bitfinity",logo:images.bitfinity},
    {title:"Internet Identity",logo:images.internetIden},
    {title:"Plug",logo:images.plug}
  ]
    
  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.heading}>LOGIN / SIGN UP</Text>
      <FlatList data={loginMethods} renderItem={({item})=>(
        <TouchableOpacity style={styles.loginBtn} onPress={()=>{handleLogin()}}>
          <Image source={item.logo} style={styles.logo}/>
          <Text style={styles.loginBtnText}>{item.title}</Text>
          <Image source={images.next} style={styles.nextIcon} />
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default BottomSheetLogin

const styles = StyleSheet.create({
    heading:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold',
        paddingVertical:5,
        marginTop:5,
        marginBottom:40,
        color:"black"
    },
    bottomSheet:{
        width:"100%",
        backgroundColor:"white",
        position:'absolute',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    loginBtn:{
        display:'flex',
        flexDirection:'row',
        minWidth:300,
        maxWidth:"80%",
        justifyContent:'space-between',
        alignItems:"center",
        paddingVertical:10,
        borderWidth:1,
        borderColor:COLORS.inputBorder,
        borderRadius:10,
        marginBottom:10,
        
    },
    loginBtnText:{
        fontSize:SIZES.medium,
        width:"40%",
        color:COLORS.inputBorder,
        fontWeight:'bold',
        textAlign:'left'
    },
    nextIcon:{
        //height:"30%",
        marginRight:15
    },
    logo:{
        marginLeft:15
    }
})