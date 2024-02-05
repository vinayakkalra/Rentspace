import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import BottomBotton from '../reusables/BottomBotton'
import Heading from '../reusables/Heading'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import OptionCard from './OptionCard'
import { Dropdown } from 'react-native-element-dropdown'

const ChooseID = ({setIdprocess,pos}) => {
  const IDoptions=[
    {
      title:"Driver's license",
      tag:"dl"
    },
    {
      title:"Passport",
      tag:"passport"
    },
    {
      title:"Identity card",
      tag:"ID"
    }
  ]
  const countries=[
    {label:"India",value:"India"},
    {label:"U.S.",value:"U.S."},
    {label:"Turkey",value:"Turkey"},
    {label:"Britain",value:"Britain"},
    {label:"Japan",value:"Japan"}
  ]
  const [country,setCountry]=useState("")
  const [IDOption,setIDOption]=useState(IDoptions[1].tag)
  return (
    <View style={styles.view}>
      <Heading text={"identity verification"} setIdprocess={setIdprocess}/>
      <Text style={styles.title}>Choose an ID type to add</Text>
      <Dropdown 
        style={styles.dropdown}
        data={countries}
        selectedTextStyle={styles.dropText}
        itemTextStyle={styles.dropText}
        labelField="label"
        valueField='value'
        containerStyle={{borderRadius:12}}
        placeholderStyle={styles.dropText}
        value={country}
        onChange={value=>setCountry(value)}
        iconStyle={{height:30,width:30}}
      />
      <OptionCard item={IDoptions[0]} IDOption={IDOption} setIDOption={setIDOption}/>
      <View style={styles.line}/>
      <OptionCard item={IDoptions[1]} IDOption={IDOption} setIDOption={setIDOption}/>
      <View style={styles.line}/>
      <OptionCard item={IDoptions[2]} IDOption={IDOption} setIDOption={setIDOption}/>
      <Text style={styles.smallText}>
        Your ID will be handled according to our Privacy.
        Policy and won't be shared with your Host or guests.
      </Text>
      <BottomBotton title={"Add an ID"} onClick={()=>{setIdprocess(0)}}/>
    </View>
  )
}

export default ChooseID

const styles = StyleSheet.create({
  view:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    backgroundColor:'white',
    width:'100%',
    height:'100%'
  },
  title:{
      color:'black',
      fontSize:SIZES.medxLarge-1,
      fontWeight:'500',
      marginTop:0,
      width:'88%',
      marginLeft:'7.5%'
  },
  smallText:{
    fontSize:SIZES.small-2,
    color:COLORS.textLightGrey,
    fontWeight:'300',
    marginLeft:'10%',
    width:'65%',
    marginVertical:25
  },
  line:{
    width:'80%',
    marginLeft:'10%',
    height:1,
    backgroundColor:COLORS.textLightGrey,
    opacity:0.5,
    marginVertical:15
  },
  dropdown:{
    width:'85%',
    borderRadius:12,
    borderWidth:1,
    borderColor:COLORS.textLightGrey,
    marginLeft:'7.5%',
    marginVertical:30,
    height:50
  },
  dropText:{
    color:COLORS.black,
    fontSize:SIZES.preMedium,
    marginLeft:20
  }
})