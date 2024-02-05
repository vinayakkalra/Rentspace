import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { COLORS,SIZES } from '../../../../constants/themes'
import PlaceCard from './PlaceCard'
import Line from '../../Reusables/Line'

const data=[
    {
        title:"An entire place",
        text:"Our comprehensive verification system checks details such as name, address."
    },
    {
        title:"A room",
        text:"Our comprehensive verification system checks details such as name, address."
    },
    {
        title:"A shared room",
        text:"Our comprehensive verification system checks details such as name, address."
    },
]

const HotelType = ({setHostModal,pos}) => {


    const [hotelType,setHotelType]=useState(-1)

  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>What type of place will guests have?</Text>
      <PlaceCard item={data[0]} sr={0} hotelType={hotelType} setHotelType={setHotelType}/>
      <Line/>
      <PlaceCard item={data[1]} sr={1} hotelType={hotelType} setHotelType={setHotelType}/>
      <Line/>
      <PlaceCard item={data[2]} sr={2} hotelType={hotelType} setHotelType={setHotelType}/>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={1} nextFunc={()=>{return true}}/>
    </View>
  )
}

export default HotelType

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'88%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:30,
        marginLeft:'8%',
    },
})