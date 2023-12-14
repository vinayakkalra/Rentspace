import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { SIZES,COLORS } from '../constants/themes'
import {  images } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BottomSheetCommunity = ({selfMod,openNotiModal}) => {
  return (
    <View style={styles.bottomSheet}>
        <View style={styles.commImgCont}>
            <Image source={images.commLogo}/>
        </View>
      <Text style={styles.heading}>
        Our community commitment
      </Text>
      <Text style={styles.tagLine}>
        Rent Space is a community where anyone can belong. 
      </Text>
      <Text style={styles.simpleText}>
      To ensure this, we're asking you to commit to the following:
      </Text>
      <Text style={styles.simpleText}>
      I agree to treat everyone in the Rent space community -regardless of their race, religion, national origin, ethnicity, skin colour, disability, sex, gender identity, sexual orientation or age
- with respect, and without judgement or bias.
      </Text>
      <Text style={styles.linkText}>
        Learn More.
      </Text>
      
      <TouchableOpacity style={styles.agreeBtn} onPress={
        ()=>{
            selfMod.current.dismiss()
            openNotiModal()
        }
      }>
                <Text style={styles.agreeText}>Accept and continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineBtn} onPress={()=>{
            alert("Please agree to the Community Guideline")
        }}>
                <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BottomSheetCommunity

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
        marginBottom:35
    },
    heading:{
        width:"80%",
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:"black",
        marginBottom:20
    },
    tagLine:{
        width:"80%",
        fontSize:SIZES.xLarge,
        fontWeight:'bold',
        color:"black",
        marginBottom:10
    },
    simpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'80%',
        marginBottom:20
    },
    linkText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'80%',
        marginBottom:30,
        fontWeight:'bold',
        textDecorationLine:'underline',
        
    },
    agreeBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:COLORS.inputBorder,
        borderRadius:10,
        height:50,
        paddingHorizontal:80,
        marginTop:10
    },
    agreeText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    },
    declineBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        paddingHorizontal:125,
        marginTop:10,
        borderWidth:1,
        borderColor:COLORS.inputBorder
    },
    declineText:{
        color:COLORS.inputBorder,
        fontWeight:'bold',
        fontSize:SIZES.medium
    }
})