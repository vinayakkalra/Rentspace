import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import DiscountCard from './DiscountCard'

const discounts=[
    {
        rate:20,
        title:'New listing promotion',
    },
    {
        rate:10,
        title:'Weekly discount',
    },
    {
        rate:30,
        title:'Monthly discount',
    },
]

const Discount = ({setHostModal,pos}) => {

  const [discount,setDiscount]=useState(20)  

  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Add discounts</Text>
      <Text style={styles.text}>Our comprehensive verification system checks details such as name, address.</Text>
      <DiscountCard discount={discount} setDiscount={setDiscount} item={discounts[0]}/>
      <View style={styles.DarkLine}/>
      <DiscountCard discount={discount} setDiscount={setDiscount} item={discounts[1]}/>
      <View style={styles.DarkLine}/>
      <DiscountCard discount={discount} setDiscount={setDiscount} item={discounts[2]}/>
      <Text style={[styles.text,{marginLeft:'12%',marginTop:25}]}>
      Only one discount will be applies per stay.
      </Text>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={3} nextFunc={()=>{return true}} />
    </View>
  )
}

export default Discount

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
        marginBottom:15
    },
    DarkLine:{
        height:1,
        backgroundColor:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginTop:15
    },
})