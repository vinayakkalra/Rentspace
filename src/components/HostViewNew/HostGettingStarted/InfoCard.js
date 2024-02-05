import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../../constants'
import { COLORS, SIZES } from '../../../constants/themes'

const InfoCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <Text style={styles.heading}>{item?.title}</Text>
        <Text style={styles.text}>
            {item?.text}
        </Text>
      </View>
      <Image source={item?.img} style={styles.img}/>
    </View>
  )
}

export default InfoCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        marginLeft:'7.5%',
        width:'85%',
        alignItems:'center',
        justifyContent:'space-between'
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'78%',
    },
    heading:{
        fontSize:SIZES.medium,
        color:'black',
        fontWeight:'bold',
        marginBottom:10,
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        
    },
    img:{
        alignSelf:'flex-start',
        marginTop:10
    }
})