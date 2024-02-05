import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from './ReUsables/Heading'
import Tagline from './ReUsables/Tagline'
import Slider from "react-native-slider"
import { COLORS,SIZES } from '../../../../../constants/themes'

const PriceRange = ({maxPrice,setMaxPrice}) => {
  return (
    <View style={styles.sec}>
      <Heading text={"Price range"}/>
      <Tagline text={"Search rooms, entire house or any type of place."}/>
      <View style={styles.sliderCont}>
        <Text style={[styles.sliderLabels,{left:'0%'}]}>$0</Text>
        <Text style={[styles.sliderLabels,{right:'0%'}]}>$10000</Text>
        <Text style={[styles.priceLabel,{left:`${((maxPrice/10000)*100)-2}%`}]}>${maxPrice}</Text>
        <Slider 
            minimumValue={0}
            maximumValue={10000}
            style={{width:'100%'}}
            value={maxPrice}
            onValueChange={value=>{setMaxPrice(value)}}
            step={10}
            minimumTrackTintColor={COLORS.hostTitle}
            thumbTintColor={COLORS.hostTitle}
            maximumTrackTintColor={COLORS.lighterGrey}
            trackStyle={styles.sliderTrack}
        />
        </View>
    </View>
  )
}

export default PriceRange

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
        marginVertical:20
    },
    sliderTrack:{
        borderRadius:20,
        height:5
    },
    sliderCont:{
        width:'100%',
        paddingVertical:5
    },
    sliderLabels:{
        color:COLORS.textLightGrey,
        opacity:0.5,
        fontWeight:'bold',
        fontSize:SIZES.small,
        position:'absolute',
        bottom:'0%'
    },
    priceLabel:{
        color:COLORS.black,
        fontWeight:'bold',
        fontSize:SIZES.small-1,
        position:'absolute',
        top:'0%',
        
    }
})