import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import { SIZES,COLORS } from '../../../../constants/themes'

const NormalComparison = ({heading,rent,comp}) => {
  return (
    <View style={styles.cont}>
      <Text style={styles.simpleText}>{heading}</Text>
      <View style={styles.iconCont}>
          {
            rent?<Icon name='check' color='green' size={30}/>:<Icon2 name='cross' color='red' size={38}/>
          }
          {
            comp?<Icon name='check' color='green' size={30}/>:<Icon2 name='cross' color='red' size={38}/>
          }
      </View>
    </View>
  )
}

export default NormalComparison

const styles = StyleSheet.create({
  cont:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'85%',
    marginLeft:"7.5%",
    
  },
  simpleText:{
    fontSize:SIZES.medium,
    color:COLORS.textLightGrey,
    
  },
  iconCont:{
    display:'flex',
    flexDirection:'row',
    width:'50%',
    justifyContent:'space-between',
    paddingHorizontal:'6%'
  }

})