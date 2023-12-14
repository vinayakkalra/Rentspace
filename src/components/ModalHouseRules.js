import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { COLORS,SIZES } from '../constants/themes'

const ModalHouseRules = ({setRulesModal}) => {
  return (
    <View style={styles.bottomSheet}>
      <TouchableOpacity style={styles.backIcon} onPress={()=>{setRulesModal(false)}}>
        <Icon2 name="angle-left" size={30} color={COLORS.textLightGrey}/>    
      </TouchableOpacity>
      <Text style={styles.heading}>House rules</Text>
      <Text style={styles.simpleText}>You'll be staying in someone's home, so please treat it with care and respect.</Text>
      <Text style={styles.subHeading}>Checking in and out</Text>
      <View style={styles.timingCont}>
        <Icon style={styles.icon} name="clock" size={30} color={COLORS.textLightGrey}/>
        <Text style={styles.subSecText}>Check-in: 14:00 - 17:00</Text>
      </View>
      <View style={styles.hrLine}></View> 
      <View style={styles.timingCont}>
        <Icon style={styles.icon} name="clock" size={30} color={COLORS.textLightGrey}/>
        <Text style={styles.subSecText}>Checkout before 11:00</Text>
      </View> 
      <Text style={styles.subHeading2}>During your stay</Text>
      <View style={styles.rulesCont}>
        <Icon2 style={styles.icon} name='group' size={25} color={COLORS.textLightGrey}/>
        <Text style={styles.subSecText}>4 guests maximum</Text>
      </View>
      <View style={styles.hrLine}></View>
      <View style={styles.rulesCont}>
        <Icon3 style={styles.icon} name='smoke-free' size={30} color={COLORS.textLightGrey}/>
        <Text style={styles.subSecText}>No smoking</Text>
      </View>
    </View>
  )
}

export default ModalHouseRules

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },
    backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        justifyContent:'flex-start',
        paddingLeft:30
    },
    heading:{
      width:"80%",
      fontSize:SIZES.xLarge,
      fontWeight:'bold',
      color:"black",
      marginBottom:15,
      marginTop:25
  },
  subHeading:{
      width:"80%",
      fontSize:SIZES.large,
      fontWeight:'bold',
      color:"black",
      marginBottom:25
  },
  subHeading2:{
    width:"80%",
    fontSize:SIZES.large,
    fontWeight:'bold',
    color:"black",
    marginBottom:25,
    marginTop:30
},
  simpleText:{
      color:COLORS.textLightGrey,
      fontSize:SIZES.preMedium,
      width:'80%',
      marginBottom:30
  },
  timingCont:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  subSecText:{
    color:COLORS.textLightGrey,
    fontSize:SIZES.medium,
    marginBottom:20,
    width:'70%'
  },
  hrLine:{
    height:2,
    borderBottomWidth:2,
    borderBottomColor:COLORS.hrLine,
    width:"100%",
    marginBottom:20
  },
  rulesCont:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  icon:{
    marginRight:20
  }
})