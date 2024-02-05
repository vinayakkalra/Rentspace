import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { COLORS,SIZES } from '../../../../constants/themes'
import TagCard from './TagCard'

const HotelTag = ({setHostModal,pos}) => {
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>  
      <Text style={styles.title}>Now, let’s describe your house</Text>
      <Text style={styles.text}>
        Our comprehensive verification system checks details such as name.
      </Text>
      <View style={styles.tagCont}>
        <TagCard text={'Peaceful'}/>
        <TagCard text={'Unique'}/>
        <TagCard text={'Stylish'}/>
        <TagCard text={'Family-friendly'}/>
        <TagCard text={'Spacious'}/>
        <TagCard text={'Central'}/>
      </View>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} nextFunc={()=>{return true}}/>
    </View>
  )
}

export default HotelTag

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.prexxLarge,
        fontWeight:'500',
        marginBottom:10,
        marginLeft:'8%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:20
    },
    tagCont:{
        width:'85%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        marginLeft:'7.5%'
    }
})