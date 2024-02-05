import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'

const ReserveBtn = ({item,onClick}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <View style={styles.price}>
            <Text style={styles.boldText}>${item?.hotelPrice}</Text>
            <Text style={styles.smallText}>/night</Text>
        </View>
        <Text style={styles.normalText}>1-6 Jan</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onClick}>
        <Text style={styles.btnText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReserveBtn

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        height:80,
        width:'100%',
        backgroundColor:'white',
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'30%',
        marginLeft:'6%'
    },
    price:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        backgroundColor:'white',
        marginBottom:5
    },
    boldText:{
        color:COLORS.black,
        fontSize:SIZES.medium+1,
        fontWeight:'bold',
        
    },
    normalText:{
        fontSize:SIZES.preMedium,
        color:COLORS.black
    },
    smallText:{
        color:COLORS.black,
        opacity:0.4,
        fontSize:SIZES.small
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        width:'37%',
        paddingVertical:16,
        marginRight:'6%'
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    }
})