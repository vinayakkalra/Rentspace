import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Octicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const HotelFacilityCard = () => {
  return (
    <>
    <View style={styles.cont}>
      <Icon2 name='meeting-room' size={35} color={'black'} style={styles.icon}/>
      <View style={styles.textCont}>
        <Text style={styles.largeText}>Self check-in</Text>
        <Text style={styles.simpleText}>You can check in with the building staff.</Text>
      </View>
    </View>
    <View style={styles.cont}>
      <Icon3 name='medal' size={35} color={'black'} style={styles.icon}/>
      <View style={styles.textCont}>
        <Text style={styles.largeText}>Lucy is a Superhost</Text>
        <Text style={styles.simpleText}>Superhosts are experienced, highly rated Hosts.</Text>
      </View>
    </View>
    <View style={styles.cont}>
      <Icon name='key' size={35} color={'black'} style={styles.icon}/>
      <View style={styles.textCont}>
        <Text style={styles.largeText}>Great check-in experience</Text>
        <Text style={styles.simpleText}>95% of recent guests gave the check-in process a 5-star rating.</Text>
      </View>
    </View>
    <View style={styles.cont}>
      <Icon2 name='event-note' size={35} color={'black'} style={styles.icon}/>
      <View style={styles.textCont}>
        <Text style={styles.largeText}>Free cancellation for 48 hours</Text>
        <Text style={styles.simpleText}></Text>
      </View>
    </View>
    </>
  )
}

export default HotelFacilityCard

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        width:'90%',
        height:85,
        
        height:60,

    },
    icon:{
        marginRight:10
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        height:'70%'
    },
    largeText:{
        fontSize:SIZES.preMedium,
        color:'black',
        // fontWeight:'bold'
    },
    simpleText:{
        fontSize:SIZES.xSmall,
        color:COLORS.textLightGrey,
        opacity:0.7
    },
})