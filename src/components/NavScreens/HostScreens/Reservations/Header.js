import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomNavHost from '../../../Navigation/BottomNavHost'

const Header = ({setShowReservations,setSorting}) => {
  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={()=>{setShowReservations(false)}}>
        <Icon name="angle-left" size={30} color={COLORS.textLightGrey}/>    
      </TouchableOpacity>
      <View style={styles.iconCont}>
        <TouchableOpacity style={styles.roundIcon}>
            <Icon2 name='filter-outline' color={COLORS.textLightGrey} size={23}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundIcon} onPress={()=>setSorting(true)}>
            <Icon2 name='compare-vertical' color={COLORS.textLightGrey} size={30}/>
        </TouchableOpacity> 
      </View>
      
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:'5%',
        marginTop:20
    },
    backBtn:{

    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        width:80,
        justifyContent:'space-between'
    },
    roundIcon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        width:35,
        height:35,
        backgroundColor:'white',
        elevation:5
    }
})