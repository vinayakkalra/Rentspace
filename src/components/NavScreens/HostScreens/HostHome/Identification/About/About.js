import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomBotton from '../reusables/BottomBotton'
import Heading from '../reusables/Heading'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { images } from '../../../../../../constants'

const About = ({setIdprocess,pos}) => {
  return (
    <View style={styles.view}>
      <Heading text={"identity verification"} setIdprocess={setIdprocess} />
      <View style={styles.textCont}>
      <Text style={styles.title}>Let’s add your government ID</Text>
        <Text style={styles.text}>
        You'll need to add an official government ID.
            Depending on what country you're from, you can add a driver's license, passport, or national identity card. This helps us make sure you're really you and is required to publish your listing(s).
        </Text>
        <Text style={styles.link}>
        How identity verification works
        </Text>
      </View>
      <Image source={images.IDAbout} style={styles.img}/>
      <BottomBotton title={"Add an ID"} onClick={()=>{setIdprocess(pos+1)}}/>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    title:{
        color:'black',
        fontSize:SIZES.medxLarge+2,
        fontWeight:'500',
        marginTop:15
    },
    textCont:{
        width:'90%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
    },
    text:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.medium-2,
        marginVertical:10,
        width:'95%'
    },
    link:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.medium-1,
        fontWeight:'700',
        textDecorationLine:'underline'
    },
    img:{

    }
})