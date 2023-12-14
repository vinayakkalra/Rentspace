import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../constants/themes'

const HeaderTitles = () => {

    const titles=[
        {id:1,name:'Amazing views',img:'f'},
        {id:2,name:'Farms',img:'f'},
        {id:3,name:'Amazing pools',img:'f'},
        {id:4,name:'Tropicals',img:'f'},
        {id:5,name:'OMG!',img:'f'},
        {id:6,name:'title6',img:'f'},
        {id:7,name:'title7',img:'f'}
    ]
    const [title,setTitle]=useState(titles[0].name)
    
  return (
    <View style={styles.titleCont}>
      <FlatList style={styles.list} data={titles} renderItem={(item)=>(
        <TouchableOpacity 
            activeOpacity={1}
            style={
                [
                    {borderBottomWidth:(item.item.name===title)?2:0},
                    styles.titleCard
                ]} 
            onPress={()=>{setTitle(item.item.name)}}
        >
            <Image source={item.img} style={styles.titleLogo}/>
            <Text style={styles.titleName}>{item.item.name}</Text>
            
        </TouchableOpacity>    
      )}
      keyExtractor={item=>item.id}
      contentContainerStyle={{columnGap:SIZES.medium}}
      horizontal
      />
    </View>
  )
}

export default HeaderTitles

const styles = StyleSheet.create({
    titleCont:{
        width:'100%',
        marginTop:38,
    },
    list:{
        marginLeft:10
    },
    titleCard:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        minWidth:40,
        borderBottomColor:'white',
    },
    titleName:{
        color:'white',
        fontSize:SIZES.small,
        marginBottom:5
    },
    titleLogo:{
        width:38,
        height:38,
        backgroundColor:COLORS.lightPurple,
        marginBottom:8,
        borderRadius:10
    }
})