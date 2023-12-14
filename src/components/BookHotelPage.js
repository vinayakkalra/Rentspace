import { StyleSheet, Text, View,Image, Touchable,TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../constants'
import { COLORS, SIZES } from '../constants/themes'
import { hotel } from '../declarations/hotel/index.js'
import HotelCard from './cards/HotelCard'
import { useSelector } from 'react-redux'

const BookHotelPage = ({openHotelDetailPage}) => {

  const {user}=useSelector(state=>state.userReducer)
  const {hotels}=useSelector(state=>state.hotelsReducer)

  const [hotelList,setHotelList]=useState([])
  const sampleName='DreamLiner Hotel'
  const sampleDes='2972 Westheimer Rd. Santa Ana, Illinois 85486 '
  async function getHotelDetails(){
    setHotelList([])
    for(let i=0;i<hotels?.length;i++){
      await hotel.getHotel(hotels[i]).then((res)=>{
        setHotelList(hotelList=>[...hotelList,res[0]])
      })
    }
  }
  useEffect(()=>{
    console.log(hotels)
    getHotelDetails()
  },[hotels])

  if(hotels?.length>0){
    return(
      <FlatList data={hotelList} style={{marginBottom:80}}  renderItem={(item)=>(
        <HotelCard name={item.item.hotelTitle} des={item.item.hotelDes} rating={4} openHotelDetailPage={openHotelDetailPage}/>
      )}/>
      
    )
  }else{
  return (
    <>
    <HotelCard name={sampleName} des={sampleDes} rating={4} openHotelDetailPage={openHotelDetailPage}/>
    
    </>
  )
  }
}

export default BookHotelPage

const styles = StyleSheet.create({
    lenderCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:20,
        marginBottom:10,
        backgroundColor:COLORS.lightPurple,
        paddingVertical:10,
        borderRadius:20,
        borderColor:'black',
        borderLeftWidth:5,
        borderBottomWidth:5
    },
    lenderImg:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight:30,
        marginLeft:20
    },
    lenderName:{
        fontSize:SIZES.preMedium,
        color:'white'
    },
    hotelPage:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'98%',
        backgroundColor:COLORS.lightBorderPurple,
        paddingVertical:20,
        borderRadius:50,
        borderWidth:2,
        borderColor:COLORS.darkPurple,
        marginLeft:4,
        marginBottom:20
    },
    title:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold',
        color:'black'
    },
    img:{
        width:'80%',
        height:240,
        borderRadius:30,
        marginBottom:10
    },
    desc:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.6,
        width:'80%'
    },
    bookBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10
    },
    bookTxt:{
        fontWeight:'bold',
        color:'black',
        fontSize:SIZES.medium
    },
    descCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        alignItems:'center'
    }
})