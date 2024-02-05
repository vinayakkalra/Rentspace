import { StyleSheet, Text, View,TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'
import BookingCard from './BookingCard'
import Icon2 from 'react-native-vector-icons/MaterialIcons'

const ShowBookings = ({bookingList,setShowReservations}) => {
  const {authData}=useSelector(state=>state.authDataReducer)
  useEffect(()=>{
    console.log('authData',authData)
  },[])
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.backIcon} onPress={()=>setShowReservations(false)}>
        <Icon name="angle-left" size={25} color={COLORS.textLightGrey}/> 
    </TouchableOpacity>
    <View style={styles.header}>
      <Text style={styles.title}>Your Bookings</Text>
      <TouchableOpacity style={styles.reloadIcon}>
      <Icon2 name="assignment-add" size={30} color={COLORS.black} onPress={()=>setShowReservations(false)}/>
      </TouchableOpacity>
    </View>
    {/* <Text style={styles.title}>Your Bookings</Text> */}
    <FlatList contentContainerStyle={styles.list} style={styles.Flist} data={bookingList} renderItem={(item)=>(
      <BookingCard item={item.item}/>
    )}/>
    </View>
  )
}

export default ShowBookings

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%'
      },
      header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%',
      },
      title:{
        color:COLORS.black,
        top:'2%',
        fontWeight:'bold',
        fontSize:SIZES.xLarge
      },
      backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        justifyContent:'flex-start',
        paddingLeft:30,
      },
      Flist:{
            width:'100%',
            marginTop:30,
      },
      list:{
          display:'flex',
          flexDirection:'column',
          paddingVertical:20,
          width:'90%',
          marginLeft:'5%'
      },
      reloadIcon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
      }
})