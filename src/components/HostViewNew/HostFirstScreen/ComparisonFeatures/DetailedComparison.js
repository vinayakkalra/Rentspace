import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import { COLORS, SIZES } from '../../../../constants/themes'

const DetailedComparison = ({heading,text,rent,comp}) => {
  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Text style={styles.heading}>{heading}</Text>
        <View style={styles.iconCont}>
          {
            rent?<Icon name='check' color='green' size={30}/>:<Icon2 name='cross' color='red' size={38}/>
          }
          {
            comp?<Icon name='check' color='green' size={30}/>:<Icon2 name='cross' color='red' size={38}/>
          }
        </View>
        
      </View>
      <Text style={styles.simpleText}>
       {text}
      </Text>
    </View>
  )
}

export default DetailedComparison

const styles = StyleSheet.create({
  cont:{
    display:'flex',
    flexDirection:'column',
    width:'85%',
    marginLeft:"7.5%",
    
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:8
  },
  heading:{
    	fontSize:SIZES.medium,
      color:COLORS.black,
      fontWeight:'bold',
      width:'40%'
  },
  simpleText:{
    fontSize:SIZES.preMedium,
    color:COLORS.textLightGrey,
    opacity:0.8
  },
  iconCont:{
    display:'flex',
    flexDirection:'row',
    width:'50%',
    justifyContent:'space-between',
    paddingHorizontal:'6%'
  }
})