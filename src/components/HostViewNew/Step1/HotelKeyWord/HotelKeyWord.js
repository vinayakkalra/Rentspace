import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { COLORS,SIZES } from '../../../../constants/themes'
import IconCard from './IconCard'
import Icon2 from 'react-native-vector-icons/AntDesign'

const arr=[1,1,1,11,1,1,1,1,1,1,1,1]

const HotelKeyWord = ({setHostModal,pos}) => {
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Which of these best describes your place?</Text>
      
      <FlatList data={arr} renderItem={(item)=>{
          return(
            <View style={styles.iconContainer} key={item.index}>
              <IconCard el={<Icon2 name='home' size={32} color={COLORS.textLightGrey}/>} text='House'/>
              <IconCard el={<Icon2 name='home' size={32} color={COLORS.textLightGrey}/>} text='Hotel'/>
              <IconCard el={<Icon2 name='home' size={32} color={COLORS.textLightGrey}/>} text='Room'/>
            </View>
          ) 
        }}
          persistentScrollbar={true}
          style={{marginBottom:80}}
        />
      
      
      
      <BottomBtn setHostModal={setHostModal} pos={pos} step={1} nextFunc={()=>{return true}}/>
    </View>
  )
}

export default HotelKeyWord

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'88%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:25,
        marginLeft:'8%'
    },
    iconContainer:{
      width:'75%',
      marginLeft:'8%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:30
    },
})