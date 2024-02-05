import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Feather'
import AddReview from '../AddReview/AddReview'

const BookingCard = ({item}) => {
  const [showAddReview,setAddReview]=useState(false)
  const [date,setDate]=useState("date")
  const getDate=()=>{
    try{
      const dateObject=new Date(item?.date)
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
      const year = dateObject.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate)
      setDate(formattedDate)
      
    }catch(err){console.log(err)}
    
  }
  useEffect(()=>{
    getDate()
  },[])
  return (
    
    <View style={styles.card}>
      <TouchableOpacity style={styles.editBtn} onPress={()=>{setAddReview(true)}}>
        
        <Icon name='edit-3' color='white' size={16}/>
        <Text style={styles.editText}>Review</Text>
      </TouchableOpacity>
      <View style={styles.textCont}>
        <Text style={styles.title}>
           Travel Destination
        </Text>
        <Text style={styles.normalText}>
          {item?.hotel?.hotelTitle}
        </Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.normalText}>Check In : {date}</Text>
        <Text style={styles.normalText}>Duration of Stay : {Number(item?.bookingDuration)} days</Text>
        <Text style={styles.normalText}>Price per night : ${Number(item?.hotel?.hotelPrice)}</Text>
      </View>
      <View style={styles.whiteHR}/>
      <View style={styles.priceCont}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.total}>${Number(item?.hotel?.hotelPrice)*Number(item?.bookingDuration)}</Text>
      </View>
      <Modal animationType='slide' visible={showAddReview}>
        <AddReview item={item} setAddReview={setAddReview}/>
      </Modal>
    </View>
  )
}

export default BookingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:COLORS.royalPurple,
        width:'92%',
        marginLeft:'5%',
        paddingVertical:20,
        borderRadius:12,
        marginBottom:20,
        elevation:10
    },
    textCont:{
      width:'85%',
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      marginBottom:10
    },
    title:{
      fontSize:SIZES.preMedium,
      color:'white',
      fontWeight:'600',
      marginBottom:0
    },
    normalText:{
      fontSize:SIZES.small,
      color:'white',
      fontWeight:'300'
    },
    priceCont:{
      display:'flex',
      flexDirection:'row',
      width:'85%',
      justifyContent:'space-between'
    },
    whiteHR:{
      backgroundColor:'white',
      width:'85%',
      height:1,
      marginBottom:7
    },
    total:{
      fontSize:SIZES.preMedium,
      color:'white',
      fontWeight:'600',
    },
    editBtn:{
      padding:5,
      position:'absolute',
      right:'7.5%',
      top:'12%',
      display:'flex',
      flexDirection:'row'
    },
    editText:{
      marginLeft:2,
      fontSize:SIZES.small,
      color:'white',
      fontWeight:'bold'
    }
})