import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import CounterCard from './CounterCard'
import Line from '../../Reusables/Line'

const BasicDetails = ({setHostModal,pos}) => {
  
  const [counts,setCounts]=useState({
    guests:1,
    beds:1,
    bedrooms:1,
    bathrooms:1
  })

  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Share some basic about your place</Text>
      <Text style={styles.text}>Our comprehensive verification system checks details such as name, address.</Text>
      <CounterCard title='Guests' counts={counts} setCounts={setCounts} self={1}/>
      <Line/>
      <CounterCard title='Bedrooms' counts={counts} setCounts={setCounts} self={2}/>
      <Line/>
      <CounterCard title='Beds' counts={counts} setCounts={setCounts} self={3}/>
      <Line/>
      <CounterCard title='Bathrooms' counts={counts} setCounts={setCounts} self={4}/>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={1} nextFunc={()=>{return true}} />
    </View>
  )
}

export default BasicDetails

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
        marginBottom:12,
        marginLeft:'8%',
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:"300",
        width:'75%',
        marginLeft:'8%',
        marginBottom:30
    },
})