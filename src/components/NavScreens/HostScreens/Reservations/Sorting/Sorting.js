import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BottomBtn from './BottomBtn'
import Header from './Header'
import Options from './Options'

const Sorting = ({setSorting}) => {

    const options=[
        {
            tag:"Cn2o",
            text:"Check-in date from newest to oldest"
        },
        {
            tag:"Co2n",
            text:"Check-in date from oldest to newest"
        },
        {
            tag:"Bn2o",
            text:"Booking date from newest to oldest"
        },
        {
            tag:"Bo2n",
            text:"Booking date from oldest to newest"
        }
    ]
    const [option,setOption]=useState(options[0].tag)
  return (
    <View style={styles.view}>
      <Header setSorting={setSorting}/>
      <Options setOption={setOption} option={option} item={options[0]}/>
      <Options setOption={setOption} option={option} item={options[1]}/>
      <Options setOption={setOption} option={option} item={options[2]}/>
      <Options setOption={setOption} option={option} item={options[3]}/>
      <BottomBtn setSorting={setSorting}/>
    </View>
  )
}

export default Sorting

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        height:'100%',
        backgroundColor:'white'
    },
})