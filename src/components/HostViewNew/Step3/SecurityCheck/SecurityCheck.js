import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import OptionCard from './OptionCard'

const SecurityCheck = ({setHostModal,pos}) => {
    const options={
        security:true,
        weapon:true,
        animal:true
    }
    const data=["Security camera","Weapons","Dangerous animals"]
   const [option,setOption]=useState(options) 
   
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Just one last step!</Text>
      <Text style={styles.subTitle}>Does your place have any of these?</Text>
      <OptionCard item={data[0]} setOption={setOption} option={option} check={option.security}/>
      <View style={styles.DarkLine}/>
      <OptionCard item={data[1]} setOption={setOption} option={option} check={option.weapon}/>
      <View style={styles.DarkLine}/>
      <OptionCard item={data[2]} setOption={setOption} option={option} check={option.animal}/>
      <View style={styles.DarkLine}/>
      <View style={styles.textCont}>
        <Text style={styles.textHead}>
        Important things to know
        </Text>
        
        <Text style={styles.textNormal}>
            Be sure to comply with your {" "}
                <Text style={styles.textLink}>local laws</Text>{" "}
            and review Rentspace's{" "}
                <Text style={styles.textLink}>nondiscrimination policy.</Text>{" "}
             and{" "}
                <Text style={styles.textLink}>guest and Host fees.</Text>

        </Text>
      </View>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={3} nextFunc={()=>{return true}} />
    </View>
  )
}

export default SecurityCheck

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
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:10,
        marginLeft:'8%'
    },
    subTitle:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:30,
        fontWeight:'bold'
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
        marginLeft:'7.5%',
        marginTop:30
    },
    textHead:{
        fontSize:SIZES.preMedium,
        color:COLORS.black,
        fontWeight:'800',
        marginBottom:4
    },
    textNormal:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:'300',
        lineHeight:20
    },
    linkBtn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'red'
    },
    textLink:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:'300',
        textDecorationLine:'underline'
    },
    DarkLine:{
        height:1,
        backgroundColor:COLORS.black,
        width:'85%',
        marginBottom:15,
        marginLeft:'7.5%'
    },
})