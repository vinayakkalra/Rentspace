import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { SIZES,COLORS } from '../../constants/themes'
import {  images } from '../../constants'
import { Switch, TouchableOpacity } from 'react-native-gesture-handler'

const BottomSheetNotification = ({self}) => {
  const [switchVal,setSwitchVal]=useState(true)  

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.commImgCont}>
            <Image source={images.commLogo}/>
        </View>
      <Text style={styles.heading}>
        Turn on Notifications?
      </Text>
      <Text style={styles.simpleText}>
      Don’t miss important messages like check-in details and account activity 
      </Text>
        <View style={styles.switchCont}>
            <Text style={styles.shortSimpleText}>
            Get travel deals, personalized 
    recommendations and more
            </Text>
            <Switch
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.3 }] }}
                value={switchVal}
                onValueChange={()=>{setSwitchVal(!switchVal)}}
                thumbColor='bisque'
                trackColor={{false:"red",true:COLORS.inputBorder}}
                
            />
        </View>
      
      <View style={styles.btnCont}>
        <TouchableOpacity style={styles.notifyBtn} onPress={()=>{
            self.current.dismiss()
        }}>
                <Text style={styles.notifyText}>Yes, notify me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn}>
                <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default BottomSheetNotification

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },

    commImgCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'left',
        width:'80%',
        marginTop:50,
        marginBottom:25
    },
    heading:{
        width:"80%",
        fontSize:SIZES.xLarge,
        fontWeight:'bold',
        color:"black",
        marginBottom:25
    },
    simpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'80%',
        marginBottom:20
    },
    alignSwitchCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        backgroundColor:'black',
        paddingHorizontal:20
    },
    switchCont:{
        marginLeft:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        marginBottom:20
        // backgroundColor:COLORS.inputBorder
    },
    switch:{
        height:20,
        width:40,
        
    },
    shortSimpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        maxWidth:'80%'
    },
    btnCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'80%'
    },
    notifyBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.inputBorder,
        borderRadius:10,
        height:50,
        paddingHorizontal:30,
        marginTop:10
    },
    notifyText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    },
    
    skipBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        paddingHorizontal:30,
        marginTop:10,
        borderWidth:1,
        borderColor:COLORS.inputBorder
    },
    skipText:{
        color:COLORS.inputBorder,
        fontWeight:'bold',
        fontSize:SIZES.medium
    }
})