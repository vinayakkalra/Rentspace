import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import NextStepsCard from './NextStepsCard'
import Icon from 'react-native-vector-icons/Octicons'
import { images } from '../../../../constants'
import ListingCard from './ListingCard'
const ReviewListing = ({setHostModal,pos}) => {

    const todos=[
        {
            icon:<Icon name='checklist' size={26} color={COLORS.textLightGrey} style={styles.icon}/>,
            title:'Confirm a few details and publish',
            text:"We'll let you know if you need to verify your identity or register with the local government."
        },
        {
            icon:<Icon name='checklist' size={26} color={COLORS.textLightGrey} style={styles.icon}/>,
            title:"Set up your calendar",
            text:"Choose which dates your listing is available. It will be visible 24 hours after you publish"
        },
        {
            icon:<Icon name='checklist' size={26} color={COLORS.textLightGrey} style={styles.icon}/>,
            title:"Adjust your settings",
            text:"Set house rules, select a cancellation policy, choose how guests book and more."
        }
    ]
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>  
      <Text style={styles.title}>Review your listing</Text>
      <Text style={styles.text}>Our comprehensive verification system checks details such as name, address.</Text>
      <View style={styles.imgCont}>
        <Image source={images.hotelImg2} style={styles.sideImg}/>
        <ListingCard/>
        <Image source={images.hotelImg3} style={styles.sideImg}/>
      </View>
      <Text style={styles.subtitle}>What's next?</Text>
      <NextStepsCard item={todos[0]}/>
      <NextStepsCard item={todos[1]}/>
      <NextStepsCard item={todos[2]}/>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={3} nextFunc={()=>{return true}}/>
    </View>
  )
}

export default ReviewListing

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
        marginBottom:5,
        marginLeft:'8%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:15
    },
    imgCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:15
    },
    sideImg:{
        height:150,
        objectFit:'cover',
        width:'17.5%'
    },
    subtitle:{
        fontSize:SIZES.xLarge,
        color:COLORS.black,
        fontWeight:'600',
        marginLeft:'9%',

    },
    icon:{
        marginRight:10,
        marginTop:10
    }
})