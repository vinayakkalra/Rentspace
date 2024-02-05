import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PlaceCard = ({item,sr,hotelType,setHotelType}) => {

  const icons=[
    <Icon2 name='home' size={32} color={(sr==hotelType)?COLORS.hostTitle:COLORS.textLightGrey} style={styles.icon}/>,
    <Icon name='meeting-room' size={32} color={(sr==hotelType)?COLORS.hostTitle:COLORS.textLightGrey} style={styles.icon}/>,
    <Icon name='groups' size={32} color={(sr==hotelType)?COLORS.hostTitle:COLORS.textLightGrey} style={styles.icon}/>
  ]

  return (
    <TouchableOpacity style={styles.card} onPress={()=>setHotelType(sr)}>
      <View style={styles.textCont}>
        <Text 
        style={(sr==hotelType)?[styles.title,{color:COLORS.hostTitle}]:styles.title}
        >
            {item?.title}
        </Text>
        <Text style={(sr==hotelType)?[styles.text,{fontWeight:'400'}]:styles.text}>
            {item?.text}
        </Text>
      </View>
      {
        icons[sr]
      }
      
    </TouchableOpacity>
  )
}

export default PlaceCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'86%',
        marginLeft:'8%',
        
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'80%'
    },
    title:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'black',
        marginBottom:10
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:"300"
    },
    icon:{
        marginTop:15
    }
})