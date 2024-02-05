import { FlatList, StyleSheet, Text, View,TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Header from './Header'
import BottomNavHost from '../../../Navigation/BottomNavHost'
import Sorting from './Sorting/Sorting'

const Reservations = ({setShowReservations}) => {

    const data=[
        {
          title:"Checking out",
          count:0
        },
        {
          title:"Currently hosting",
          count:0
        },
        {
          title:"Arriving soon",
          count:0
        }
      ]
      const [reservationType,setReservationType]=useState(data[0].title)
      const [sorting,setSorting]=useState(false)
  return (
    <View style={styles.view}>
        <Header setShowReservations={setShowReservations} setSorting={setSorting}/>
      <Text style={styles.title}>Reservations</Text>
      <FlatList style={styles.reservationTitleList} data={data} renderItem={(item)=>{
        return(
            <TouchableOpacity 
              onPress={()=>setReservationType(item.item.title)}
              style={(item.item.title==reservationType)?styles.selectedReservationType:styles.reservationType}>
              <Text style={(item.item.title==reservationType)?styles.selectedReservationTypeText:styles.reservationTypeText}>
                {item.item.title} ({item.item.count})
              </Text>
            </TouchableOpacity> 
        )
      }}
      horizontal={true}
      />
      <View style={styles.reservationsCont}>
        <Text style={styles.simpleText}>Sorry!</Text>
        <Text style={styles.simpleText}>
            You don’t have any guest checking out today or tomorrow
        </Text>
      </View>
      <BottomNavHost/>
      <Modal animationType='slide' visible={sorting}>
        <Sorting setSorting={setSorting}/>
      </Modal>
    </View>
  )
}

export default Reservations

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        height:'100%',
        backgroundColor:'white'
    },
    title:{
        width:'50%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:16,
        marginLeft:'5%',
        marginTop:25
    },
    reservationTitleList:{
        maxHeight:52,
        marginLeft:'4%'
      },
      reservationType:{
        display:'row',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:COLORS.hostTitle,
        height:40,
        paddingHorizontal:10,
        marginHorizontal:6,
        borderRadius:30
      },
      reservationTypeText:{
          fontSize:SIZES.small,
          color:COLORS.textLightGrey,
          fontWeight:'600'
      },
      selectedReservationType:{
        display:'row',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:COLORS.hostTitle,
        height:40,
        paddingHorizontal:10,
        marginHorizontal:6,
        borderRadius:30,
        backgroundColor:COLORS.hostTitle
      },
      selectedReservationTypeText:{
        fontSize:SIZES.small,
        color:'white',
        fontWeight:'400',
    },
    reservationsCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:COLORS.lighterGrey,
        width:'90%',
        marginLeft:'5%',
        borderRadius:20,
        minHeight:220,
        height:'65%',
        paddingTop:70
      },
      simpleText:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        textAlign:'center',
        maxWidth:'70%',
        marginBottom:10,
        fontWeight:'400',
      },
})