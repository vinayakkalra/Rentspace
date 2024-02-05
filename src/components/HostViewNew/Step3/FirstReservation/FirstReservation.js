import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import OptionCard from './OptionCard'

const FirstReservation = ({setHostModal,pos}) => {

    const [selected,setSelected]=useState('Any rentspace guest')
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>
      Choose who to welcome for your first reservation
      </Text>
      <Text style={styles.text}>
      Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.
      </Text>
      <OptionCard 
        title={"Any rentspace guest"}
        text={"Our comprehensive verification system checks details such as name, address."}
        selected={selected}
        setSelected={setSelected}
      />
      <OptionCard
        title={"Any experienced guest"}
        text={"Our comprehensive verification system checks details such as name, address."}
        selected={selected}
        setSelected={setSelected}
      />
      <BottomBtn setHostModal={setHostModal} pos={pos} step={3} nextFunc={()=>{return true}} />
    </View>
  )
}

export default FirstReservation

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:5,
        marginLeft:'8%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:20
    },
})