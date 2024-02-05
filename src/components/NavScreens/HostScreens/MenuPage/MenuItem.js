import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const MenuItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={item?.onClick}>
        <View style={styles.titleCont}>
            {
                item?.icon
            }
            <Text style={styles.title}>{item?.title}</Text>
        </View>
        <Icon name='chevron-small-right' size={28} color={COLORS.textLightGrey}/>
    </TouchableOpacity>
  )
}

export default MenuItem

const styles = StyleSheet.create({
    itemCard:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'85%',
        marginLeft:'7.5%',
        marginVertical:10
    },
    titleCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    title:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        marginLeft:10
    }
})