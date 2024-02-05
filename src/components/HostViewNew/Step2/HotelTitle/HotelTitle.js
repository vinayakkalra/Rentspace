import { StyleSheet, Text, View,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setListing } from '../../../../redux/NewListing/actions'

const HotelTitle = ({setHostModal,pos}) => {
    const [title,setTitle]=useState('')
    const [len,setLen]=useState(0)
    const {listing}=useSelector(state=>state.listingReducer)
    const dispatch=useDispatch()

    const checkEmpty=()=>{
        if(title==''){
            alert("You cannot leave title empty")
            return false
        }else{
            dispatch(setListing({...listing,hotelTitle:title,createdAt:"to be set"}))
            return true
        }
    }

    const checkLen=(value)=>{
        if(value?.length<=32){
            setTitle(value)
            setLen(value.length)
        }else{
            alert('Title must be within 32 characters!')
        }
    }

  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>  
      <Text style={styles.title}>
        Now, let’s give your house a title
      </Text>
      <Text style={styles.text}>
       Our comprehensive verification system checks details such as name.
      </Text>
      
      <TextInput 
        onChangeText={value=>{
            checkLen(value)
        }}
        style={styles.input} 
        value={title}
        numberOfLines={3}
        multiline={true}
      />
      <Text style={styles.smallText}>{len}/32</Text>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} nextFunc={checkEmpty}/>
    </View>
  )
}

export default HotelTitle

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
        height:150,
        width:'85%',
        marginLeft:'7.5%',
        borderWidth:1,
        borderColor:COLORS.textLightGrey,
        borderRadius:20,
        color:COLORS.black,
        textAlignVertical:'top',
        padding:15,
        lineHeight:20,
        fontWeight:'bold',
        letterSpacing:2,
        opacity:0.5
    },
    smallText:{
        fontSize:SIZES.xSmall,
        color:COLORS.textLightGrey,
        marginLeft:'8.5%',
    }
})