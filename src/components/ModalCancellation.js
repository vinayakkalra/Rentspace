import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../constants/themes'

const ModalCancellation = ({setCancelModal}) => {
  return (
    <View style={styles.bottomSheet}>
      <TouchableOpacity style={styles.backIcon} onPress={()=>{setCancelModal(false)}}>
        <Icon name="angle-left" size={30} color={COLORS.textLightGrey}/>    
      </TouchableOpacity>  
      <Text style={styles.heading}>Cancellation policy</Text>
      <Text style={styles.simpleText}>Before you book, make sure you're comfortable with this Host's cancelation policy. Keep in mind that Airbnb's Extenuating Circumstances policy doesn't cover cancellations due to illness or travel disruptions caused by COVID-19.</Text>
      <Text style={styles.subHeading}>Cancel by</Text>
      <View style={styles.subSec}>
        <View style={styles.dateCont}>
          <Text style={styles.dateBold}>16 Dec</Text>
          <Text style={styles.dateSmall}>14:00</Text>
        </View>
        <Text style={styles.subSecText}>Full refund: Get back 100% of what you paid.</Text>
      </View>
      <View style={styles.hrLine}></View>
      <View style={styles.subSec}>
        <View style={styles.dateCont}>
          <Text style={styles.dateBold}>17 Dec</Text>
          <Text style={styles.dateSmall}>14:00</Text>
          <Text style={styles.dateSmall}>(check-in)</Text>
        </View>
        <Text style={styles.subSecText}>Partial refund: Get back every night but the first one. No refund of the first night or the service
fee.
</Text>
      </View>
      <View style={styles.hrLine}></View>
      <Text style={styles.linkText}>Learn more about cancellation policies</Text>
    </View>
  )
}

export default ModalCancellation

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
  simpleText:{
      color:COLORS.textLightGrey,
      fontSize:SIZES.small,
      width:'80%',
      marginBottom:20
  },
  subSec:{
    maxWidth:'80%',
    display:'flex',
    flexDirection:'row'
  },
  subSecText:{
    color:COLORS.textLightGrey,
    fontSize:SIZES.medium,
    marginBottom:20,
    width:'70%'
  },
  dateCont:{
    display:'flex',
    flexDirection:'column',
    width:'35%'
  },
  dateBold:{
    width:"80%",
    fontSize:SIZES.largeMed,
    fontWeight:'bold',
    color:"black",
    marginBottom:10
  },
  dateSmall:{
    color:COLORS.textLightGrey,
    fontSize:SIZES.small,
    width:'100%',
    marginBottom:5,
    opacity:0.5
  },
  hrLine:{
    height:2,
    borderBottomWidth:2,
    borderBottomColor:COLORS.hrLine,
    width:"100%",
    marginBottom:20
  },
  linkText:{
    color:COLORS.textLightGrey,
    fontSize:SIZES.medium,
    marginBottom:20,
    width:'80%',
    fontWeight:'bold',
    textDecorationLine:'underline',
  }
})