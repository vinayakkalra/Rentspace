import { TextInput, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setListing } from '../../../../redux/NewListing/actions'

const HotelDesc = ({setHostModal,pos}) => {
  const [len,setLen]=useState(0)
  const [desc,setDesc]=useState('')

  const dispatch=useDispatch()
  const {listing}=useSelector(state=>state.listingReducer)
  const descChange=(value)=>{
    if(value.length>500){
      alert('Description cannot be longer than 500 characters')
    }else{
      setLen(value.length)
      setDesc(value)
    }
  }
  const checkEmpty=()=>{
    if(desc==''){
      alert("Please do not leave description empty")
      return false
    }else{
      dispatch(setListing({...listing,hotelDes:desc}))
      return true
    }
  }
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Create your description</Text>
      <Text style={styles.text}>Our comprehensive verification system checks details such as name.</Text>
      <TextInput 
        onChangeText={value=>descChange(value)}
        style={styles.input} 
        value={desc}
        numberOfLines={25}
        multiline={true}
      />
      <Text style={styles.smallText}>{len}/500</Text>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} nextFunc={checkEmpty}/>
    </View>
  )
}

export default HotelDesc

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
      fontSize:SIZES.prexxLarge,
      fontWeight:'500',
      marginBottom:10,
      marginLeft:'8%'
  },
  text:{
      fontSize:SIZES.preMedium,
      color:COLORS.textLightGrey,
      width:'85%',
      marginLeft:'7.5%',
      marginBottom:20
  },
  input:{
    height:200,
    width:'85%',
    marginLeft:'7.5%',
    borderWidth:1,
    borderColor:COLORS.textLightGrey,
    borderRadius:20,
    color:COLORS.black,
    textAlignVertical:'top',
    padding:15,
    opacity:0.5,
    fontSize:SIZES.small
  },
  smallText:{
    fontSize:SIZES.xSmall,
    color:COLORS.textLightGrey,
    marginLeft:'8.5%',
  }
})