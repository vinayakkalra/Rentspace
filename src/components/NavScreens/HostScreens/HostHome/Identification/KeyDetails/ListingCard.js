import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { images } from '../../../../../../constants'

const ListingCard = () => {
  return (
    <View style={styles.card}>
      <Image source={images.hotelImg1} style={styles.img}/>
      <View style={styles.textCont}>
        <Text style={styles.title}>Listing name</Text>
        <Text style={styles.text}>Listing address</Text>
      </View>
    </View>
  )
}

export default ListingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        elevation:8,
        borderRadius:12,
        height:60,
        width:'80%',
        marginVertical:20,
        paddingHorizontal:3
    },
    img:{
        width:'20%',
        marginHorizontal:5,
        height:'85%',
        borderRadius:10,
        
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        height:'60%',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    title:{
        fontSize:SIZES.preMedium,
        color:'black'
    },
    text:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.7
    }
})