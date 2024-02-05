import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const OptionCard = ({item,IDOption,setIDOption}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item?.title}</Text>
      <TouchableOpacity style={styles.radio} onPress={()=>setIDOption(item?.tag)}>
        <View style={(item?.tag==IDOption)?styles.radioSelected:{}}/>
      </TouchableOpacity>
    </View>
  )
}

export default OptionCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:"80%",
        marginLeft:"10%"
    },
    title:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
    },
    radio:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:22,
        height:22,
        borderWidth:1.3,
        borderRadius:20,
        borderColor:COLORS.textLightGrey
    },
    radioSelected:{
        width:12,
        height:12,
        borderRadius:10,
        backgroundColor:COLORS.textLightGrey
    }
})