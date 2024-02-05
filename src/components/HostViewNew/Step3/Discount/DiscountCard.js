import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'

const DiscountCard = ({discount,setDiscount,item}) => {
  return (
    <TouchableOpacity 
        style={styles.card} 
        onPress={()=>{
            setDiscount(item.rate)
        }}
    >
      <View style={styles.textCont}>
        <Text 
            style={(discount==item.rate)?
                styles.bigText:
                [styles.bigText,{opacity:0.5}]}
        >
            {item.rate}%
        </Text>
        <Text style={styles.medText}>{item.title}</Text>
        <Text style={styles.smallText}>
            Offers {item.rate}% off your  first 3 listings
        </Text>
      </View>
      <View style={styles.iconCont}>
        <Icon name='check' size={16} color={COLORS.textLightGrey}/>
      </View>
    </TouchableOpacity>
  )
}

export default DiscountCard

const styles = StyleSheet.create({
    card:{
        width:'85%',
        marginLeft:'7.5%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginTop:8,
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    bigText:{
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
    },
    medText:{
        color:COLORS.black,
        fontSize:SIZES.preMedium,
        fontWeight:'500',
    },
    smallText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.preMedium,
        fontWeight:'300',
    },
    iconCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderColor:COLORS.textLightGrey,
        borderWidth:1.5,
        borderRadius:4,
        padding:1,
        marginTop:10
    }
})