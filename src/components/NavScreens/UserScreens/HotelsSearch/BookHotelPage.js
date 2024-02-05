import { StyleSheet, Text, View,Image, Touchable,TouchableOpacity,FlatList, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../../constants'
import { COLORS, SIZES } from '../../../../constants/themes'
import HotelCard from './HotelDetails/cards/HotelCard'
import { useDispatch, useSelector } from 'react-redux'
import { setHotelList } from '../../../../redux/hotelList/actions'
import { setBookings } from '../../../../redux/UserBookings/actions'
import ShowBookings from './HotelDetails/ShowBookings/ShowBookings'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'

const BookHotelPage = ({navigation,queryHotels}) => {

  const {user}=useSelector(state=>state.userReducer)
  const {hotels}=useSelector(state=>state.hotelsReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  // const {authData}=useSelector(state=>state.authDataReducer)
  const dispatch=useDispatch()
  const [hotelsList,setHotelsList]=useState([])
  const [showReservation,setShowReservations]=useState(false)
  const sampleName='DreamLiner Hotel'
  const sampleDes='2972 Westheimer Rd. Santa Ana, Illinois 85486 '
  const [bookingList,setBookingList]=useState([])
  async function getReservations(){
    // setShowReservations(true)
    setBookingList([])
    await actors?.bookingActor.getBookingId().then((res)=>{
      console.log("getid resp : ",res)
      
      console.log("all bookings1: ",res[0])
      res.map(async(r)=>{
        console.log("booking-->",r)
        let hotelId=r.split("#")[0]+"#"+r.split("#")[1]
        console.log(hotelId)
        await actors?.bookingActor.getBookingDetials(r).then(async(resp)=>{
          let hotel=null
          await actors?.hotelActor.getHotel(hotelId).then((hRes)=>{
            hotel={...hRes[0],hotelId:hotelId}
          }).catch((err)=>{console.log(err)})
          console.log("booking details : ",resp)
          console.log({...resp[0],hotel:hotel,bookingId:r})
          setBookingList(b=>[...b,{...resp[0],hotel:hotel,bookingId:r}])
        }).catch((err)=>console.log(err))
      })
    }).catch((err)=>{
      console.log("getid err :",err)
      // alert(err)
    })
    console.log("bookingList",bookingList)
  }
  async function dispatchBookingData(){
      setShowReservations(true)
      console.log("final booking",bookingList)
      
  }
  async function getHotelDetails(){
    setHotelsList([])
    for(let i=0;i<hotels?.length;i++){
      await actors.hotelActor?.getHotel(hotels[i]).then((res)=>{
        setHotelsList(hotelsList=>[...hotelsList,{...res[0],id:hotels[i]}])
        console.log({...res[0],id:hotels[i]})
      })
    }
    try{
      dispatch(setHotelList(hotelsList))
    }catch(err){console.log(err)}
    
  }
  async function getQueryHotelDetails(){
    setHotelsList([])
    for(let i=0;i<queryHotels?.length;i++){
      await actors.hotelActor?.getHotel(queryHotels[i]).then((res)=>{
        setHotelsList(hotelsList=>[...hotelsList,{...res[0],id:queryHotels[i]}])
        console.log({...res[0],id:queryHotels[i]})
      })
    }
    try{
      dispatch(setHotelList(hotelsList))
    }catch(err){console.log(err)}
    
  }
  const reloadData=()=>{
    getHotelDetails()
    getReservations()
    // console.log("authData : ",authData)

  }
  useEffect(()=>{
    getHotelDetails()
    getReservations()
  },[hotels])

  if(hotels?.length>0){
    return(
      <>
      <View style={styles.btnCont}>

      <TouchableOpacity style={[styles.btn]} onPress={reloadData}>
          <Icon2 name="reload-circle-sharp" size={20} color={COLORS.black}/>
          <Text style={styles.btnText}>Reload Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={dispatchBookingData}>
          <Icon name="address-book" size={20} color={COLORS.black}/>
          <Text style={styles.btnText}>Show my bookings</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={hotelsList} style={{marginBottom:80}}  renderItem={(item)=>(
        <HotelCard item={item.item} navigation={navigation} />
      )}/>
      <Modal animationType='slide' visible={showReservation}>
        <ShowBookings bookingList={bookingList} setShowReservations={setShowReservations}/>
      </Modal>
      </>
    )
  }else{
  return (
    <>
    <HotelCard name={sampleName} des={sampleDes} rating={4} />
    
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
    },
    btnCont:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:'100%',
      paddingHorizontal:'8%'
    },
    btn:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginTop:10,
      width:'45%',
      backgroundColor:'white',
      paddingVertical:5,
      borderRadius:8,
      elevation:10
    },
    btnText:{
      color:COLORS.black,
      fontSize:SIZES.small,
      fontWeight:'bold',
      marginLeft:6
    }
})