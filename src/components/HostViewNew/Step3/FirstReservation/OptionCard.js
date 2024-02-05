import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'

const OptionCard = ({title,text,selected,setSelected}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <TouchableOpacity style={styles.radio} onPress={()=>setSelected(title)}>
        <View style={(title==selected)?styles.checked:styles.unchecked} />
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
        borderWidth:1,
        borderColor:COLORS.hostTitle,
        borderRadius:15,
        paddingHorizontal:10,
        width:'80%',
        marginLeft:'7.5%',
        paddingVertical:10,
        marginBottom:10
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        width:'75%',
        
    },
    heading:{
        fontSize:SIZES.largeMed,
        fontWeight:'bold',
        color:COLORS.black,
        marginBottom:6
    },
    text:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        marginBottom:10
    },
    radio:{
        width:25,
        height:25,
        borderWidth:1,
        borderColor:COLORS.hostTitle,
        borderRadius:20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    checked:{
        width:'65%',
        height:'65%',
        backgroundColor:COLORS.hostTitle,
        borderRadius:20
    },
    unchecked:{
        width:'65%',
        height:'65%',
        backgroundColor:'white',
        borderRadius:20
    }
})