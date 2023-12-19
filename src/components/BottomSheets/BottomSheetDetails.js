import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../../constants/themes'
import {  images } from '../../constants'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/FontAwesome6'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { Dropdown } from 'react-native-element-dropdown'
import { TextInput } from 'react-native-gesture-handler'
import Slider from "react-native-slider"

const BottomSheetDetails = () => {

    const [city,setCity]=useState("Select City")
    const [rooms,setRooms]=useState('1')
    const [reason,setReason]=useState("Vacation")
    const [budget,setBudget]=useState(400)

    const data = [
        { label: 'Ludhiana', value: 'Ludhiana' },
        { label: 'Jalandhar', value: 'Jalandhar' },
        { label: 'Phagwara', value: 'Phagwara' },
        
      ];

      const data2 = [
        { label: 'Vacation', value: 'Vacation' },
        { label: 'Work', value: 'Work' },
        { label: 'Other', value: 'Other' },
        
      ];

  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.heading}>Details to be filled</Text>
      <View style={styles.sectionCont}>
        <Text style={styles.simpleText}>Select Your City</Text>
        <View style={styles.subSec}>
            <Icon style={styles.icons} name="location" size={27} color={COLORS.iconColourModal}/>
            <Dropdown 
                data={data} 
                style={styles.simpleDrop} 
                value={city} placeholder={city} 
                placeholderStyle={styles.cityText}
                onChange={item=>{setCity(item.value)}}
                labelField="label"
                valueField='value'
                itemTextStyle={styles.cityText}
                search
                searchPlaceholder='Search ...'
                inputSearchStyle={styles.cityText}
                selectedTextStyle={styles.cityText}
            />
        </View>
        
      </View>
      <View style={styles.hrDiv}></View>
      <View style={styles.sectionCont}>
        <Text style={styles.simpleText}>Select Your Budget</Text>
        <View style={styles.subSec}>
            <Icon2 style={styles.icons} name="money-bill-wave" size={27} color={COLORS.iconColourModal}/>
            <View style={styles.sliderCont}>
                <Slider 
                    minimumValue={0}
                    maximumValue={10000}
                    style={styles.slider}
                    value={budget}
                    onValueChange={value=>{setBudget(value)}}
                    step={10}
                    minimumTrackTintColor={COLORS.inputBorder}
                    thumbTintColor="bisque"
                    maximumTrackTintColor={COLORS.inputBorder2}
                    trackStyle={styles.sliderTrack}
                />
                <View style={styles.sliderLabelCont}>
                    <Text style={styles.sliderLabel}>
                        $00
                    </Text>
                    <Text style={styles.sliderLabel}>
                        $10000
                    </Text>
                </View>
            </View>
            
        </View>
      </View>
      <View style={styles.hrDiv}></View>
      <View style={styles.sectionCont}>
        <Text style={styles.simpleText}>No of rooms</Text>
        <View style={styles.subSec}>
            <Icon3 style={styles.icons} name="door-open" size={27} color={COLORS.iconColourModal}/>
            <TextInput style={styles.simpleInput} placeholder='1-2' value={rooms} onChange={(e)=>{setRooms(e.target.value)}}/>
        </View>
      </View>
      <View style={styles.hrDiv}></View>
      <View style={styles.sectionCont}>
        <Text style={styles.simpleText}>Purpose for staying in</Text>
        <View style={styles.subSec}>
            <Icon4 style={styles.icons} name="error-outline" size={30} color={COLORS.iconColourModal}/>
            <Dropdown 
                data={data2} 
                style={styles.simpleDrop} 
                value={reason} placeholder={reason} 
                placeholderStyle={styles.cityText}
                onChange={item=>{setReason(item.value)}}
                labelField="label"
                valueField='value'
                itemTextStyle={styles.cityText}

                selectedTextStyle={styles.cityText}
            />
        </View>
      </View>
    </View>
  )
}

export default BottomSheetDetails

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },
    sectionCont:{
        display:'flex',
        flexDirection:'column',
        width:'80%'
    },
    heading:{
        marginTop:25,
        marginBottom:30,
        width:"80%",
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:"black",
        textAlign:'center'
    },
    simpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.preMedium,
        width:'80%',
        marginBottom:10,
        marginTop:15
    },
    subSec:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:20,
    },
    hrDiv:{
        height:2,
        borderBottomWidth:1,
        borderBottomColor:COLORS.hrLine,
        width:"100%"
    },
    slider:{
        width:"100%",
    },
    sliderTrack:{
        borderRadius:20,
        height:10
    },
    sliderCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'80%'
    },
    sliderLabelCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    sliderLabel:{
        color:'black',
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    },
    simpleDrop:{
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderRadius:10,
        width:'80%',
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    simpleInput:{
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderRadius:10,
        width:'20%',
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    cityText:{
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    rem:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        marginBottom:20
    },
    icons:{
        marginRight:15
    }
})
