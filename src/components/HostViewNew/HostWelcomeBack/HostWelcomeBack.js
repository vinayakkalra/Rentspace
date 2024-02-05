import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackBtn from '../Reusables/BackBtn'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../constants/themes'
import Line from '../Reusables/Line'
import ListingOption from './ListingOption'


const HostWelcomeBack = ({setHostModal}) => {
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <BackBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Welcome back! Lucy</Text>
      <Text style={styles.subTitle}>Finish your listing</Text>
      <View style={styles.listingCard}>
        <Icon2 name='home' color={COLORS.hostTitle} size={40}/>
        <Text style={styles.listingCardText}>
            Your listing started on 25 November 2023
        </Text>
        <Icon name='arrow-forward-ios' size={20} color={COLORS.textLightGrey}/>
      </View>
      <Line/>
      <View style={styles.listingFuncCont}>
        <Text style={styles.listingFuncTitle}>Start a new listing</Text>
        <ListingOption type={'newListing'} action={()=>setHostModal(3)}/>
        <ListingOption type={'duplicateListing'} action={()=>setHostModal(3)}/>
      </View>
    </ScrollView>
  )
}

export default HostWelcomeBack

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
    },
    title:{
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:24,
        marginTop:10,
        marginLeft:'10%'
    },
    subTitle:{
      color:COLORS.hostTitle,
      fontSize:SIZES.large,
      fontWeight:'800',
      marginBottom:14,
      marginLeft:'10%'
    },
    listingCard:{
      display:'flex',
      flexDirection:'row',
      width:'80%',
      alignItems:'center',
      marginLeft:'10%',
      justifyContent:'space-between',
      marginVertical:20,
      borderColor:COLORS.hostTitle,
      borderRadius:10,
      borderWidth:1,
      paddingHorizontal:10,
      paddingVertical:20,
      marginBottom:30
    },
    listingCardText:{
      width:'60%',
      color:'black',
      fontWeight:'bold',
      fontSize:SIZES.small
    },
    listingFuncCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      width:'85%',
      marginLeft:'7.5%',
      marginTop:20
    },
    listingFuncTitle:{
      fontSize:SIZES.medium,
      fontWeight:'bold',
      color:'black',
      marginBottom:10
    }
})