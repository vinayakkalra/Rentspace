import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'

const Options = ({setOption,option,item}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{item?.text}</Text>
      <TouchableOpacity style={styles.radio} onPress={()=>setOption(item.tag)}>
        <View style={(item.tag==option)?styles.radioSelected:{backgroundColor:'white'}}/>
      </TouchableOpacity>
    </View>
  )
}

export default Options

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:COLORS.hostTitle,
        borderWidth:1,
        borderRadius:12,
        width:'90%',
        height:75,
        marginLeft:'5%',
        marginVertical:6
    },
    text:{
        color:COLORS.black,
        fontSize:SIZES.medium,
        paddingHorizontal:'3%',
        fontWeight:'500'
    },
    radio:{
        width:25,
        height:25,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:COLORS.hostTitle,
        borderRadius:20,
        marginRight:'3%'
    },
    radioSelected:{
        borderRadius:20,
        backgroundColor:COLORS.hostTitle,
        width:15,
        height:15
    }
})