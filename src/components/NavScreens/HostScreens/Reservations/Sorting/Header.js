import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'
const Header = ({setSorting}) => {
  return (
    <View style={styles.header}>
        <TouchableOpacity style={styles.cross} onPress={()=>setSorting(false)}>
            <Icon name='cross' color={COLORS.textLightGrey} size={25}/>
        </TouchableOpacity>
        <Text style={styles.text}>Sort</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        paddingHorizontal:'5%',
        marginTop:20,
        marginBottom:30
    },
    cross:{
        position:'absolute',
        left:'6%'
    },
    text:{
        fontSize:SIZES.medium,
        color:COLORS.textLightGrey,
        fontWeight:'500' 
    }
})