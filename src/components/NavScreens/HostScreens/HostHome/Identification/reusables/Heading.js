import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'

const Heading = ({text,setIdprocess}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.icon} onPress={()=>{setIdprocess(0)}}>
        <Icon name='cross' size={24} color={COLORS.textLightGrey} />
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
  header:{
    width:'100%',
    marginVertical:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  icon:{
    width:25,
    height:25,
    position:'absolute',
    left:'5%',
    top:"2%"
  },
  text:{
    fontSize:SIZES.small+2,
    fontWeight:'bold',
    color:'black'
  }
})