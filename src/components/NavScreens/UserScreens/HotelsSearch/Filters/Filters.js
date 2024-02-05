import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'
import TypeOfPlace from './TypeOfPlace'
import Line from './ReUsables/Line'
import PriceRange from './PriceRange'


const Filters = ({setShowFilters}) => {
    const [maxPrice,setMaxPrice]=useState(800)
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cross} onPress={()=>setShowFilters(false)}>
            <Icon name='cross' color={COLORS.black} size={22}/>
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
      </View>
      <TypeOfPlace/>
      <Line/>
      <PriceRange maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
      <Line/>
      <View style={styles.footer}>
        <View style={styles.placeHolder}/>
        <TouchableOpacity>
            <Text style={styles.link}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Show places</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Filters

const styles = StyleSheet.create({
    view:{
        position:'absolute',
        bottom:'0%',
        height:'93%',
        width:'100%',
        backgroundColor:'white',
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    header:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        justifyContent:'center',
        marginVertical:12
    },
    cross:{
        position:'absolute',
        left:'3%'
    },
    title:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.medium
    },
    footer:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        position:'absolute',
        bottom:'0%',
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        elevation:20,
        paddingBottom:10,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:15
    },
    link:{
        color:COLORS.textLightGrey,
        fontWeight:'600',
        textDecorationLine:'underline',
        fontSize:SIZES.medium
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        paddingVertical:12, 
        width:'40%'
    },
    btnText:{
        fontSize:SIZES.preMedium+1,
        fontWeight:'800',
        color:'white'
    },
    placeHolder:{
        position:'absolute',
        width:'6%',
        backgroundColor:COLORS.textLightGrey,
        height:3,
        left:'47%',
        borderRadius:2,
        top:'15%',
        opacity:0.5
    }
})