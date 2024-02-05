import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomBotton from '../reusables/BottomBotton'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import ListingCard from './ListingCard'
import StatusCard from './StatusCard'
import VerifyBtn from './VerifyBtn'

const KeyDetails = ({setIdprocess,pos}) => {
    const processes=[
        {
            title:"Create your listing",
            text:"",
            status:"Complete"
        },
        {
            title:"Confirm your phone number",
            text:"Our comprehensive verification system checks details such as name, address.",
            status:"Complete"
        },
        {
            title:"Verify your identity",
            text:"Our comprehensive verification system checks details such as name, address.",
            status:"Required"
        }
    ]
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={()=>setIdprocess(0)} style={styles.backBtn}>
        <Icon name="angle-left" size={24} color={COLORS.textLightGrey}/>
      </TouchableOpacity>
      <Text style={styles.title}>Key details to take care of</Text>
      <ListingCard/>
      <StatusCard item={processes[0]}/>
      <View style={styles.line}/>
      <StatusCard item={processes[1]}/>
      <View style={styles.line}/>
      <VerifyBtn item={processes[2]} setIdprocess={setIdprocess} pos={pos}/>
      <BottomBotton title={"Publish listing"} onClick={()=>{}}/>
    </View>
  )
}

export default KeyDetails

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    backBtn:{
        width:30,
        height:30,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:'1.5%',
        left:'4%'
    }  ,
    title:{
        color:'black',
        fontSize:SIZES.medxLarge+2,
        fontWeight:'500',
        marginTop:45
    } ,
    line:{
        width:'100%',
        height:1,
        backgroundColor:COLORS.textLightGrey,
        opacity:0.15,
        marginVertical:10
    }
})