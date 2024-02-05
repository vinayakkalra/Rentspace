import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackBtn from '../Reusables/BackBtn'
import { COLORS,SIZES } from '../../../constants/themes'
import Line from '../Reusables/Line'
import InfoCard from './InfoCard'
import { images } from '../../../constants'

const cards=[
    {
        title:"Tell us about your place",
        text:"Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.",
        img:images.hostBed
    },
    {
        title:"Make it stand out",
        text:"Our comprehensive verification system checks details such as name, address.",
        img:images.hostMirror
    },
    {
        title:"Finish up and Publish",
        text:"Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.",
        img:images.hostDoor
    }
]

const HostGettingStarted = ({setHostModal}) => {
  return (
    <View style={styles.view}>
      <View style={styles.subView}>
        <BackBtn setHostModal={setHostModal}/>
        <Text style={styles.title}>It’s easy to get started on Rentspace</Text>
        <InfoCard item={cards[0]}/>
        <Line/>
        <InfoCard item={cards[1]}/>
        <Line/>
        <InfoCard item={cards[2]}/>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>setHostModal(4)}>
        <Text style={styles.btnText}>Get started</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HostGettingStarted

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        justifyContent:'space-between',
        height:'100%'
    },
    subView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:24,
        marginTop:20,
        marginLeft:'7.5%'
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'85%',
        marginLeft:'7.5%',
        backgroundColor:COLORS.hostTitle,
        borderRadius:16,
        paddingVertical:15,
        marginBottom:20
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'white',
        marginTop:'auto',
        
    
    }
})