import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
const NextStepsCard = ({item}) => {
  return (
    <View style={styles.card}>
      {
        item?.icon
      }  
      <View style={styles.textCont}>
        <Text style={styles.heading}>
            {item?.title}
        </Text>
        <Text style={styles.text}>
            {item?.text}
        </Text>
      </View>
    </View>
  )
}

export default NextStepsCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:'85%',
        marginLeft:'7.5%',
        marginVertical:10
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        width:'90%'
    },
    heading:{
        color:COLORS.black,
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    },
    text:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.preMedium-1,
        fontWeight:'300'
    },
    
})