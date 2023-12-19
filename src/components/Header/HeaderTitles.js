import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../../constants/themes'
import { images } from '../../constants'

const HeaderTitles = () => {

    const titles=[
        {id:1,name:'Amazing views',img:images.sampleMapIcon},
        {id:2,name:'Farms',img:images.sampleMapIcon},
        {id:3,name:'Amazing pools',img:images.sampleMapIcon},
        {id:4,name:'Tropicals',img:images.sampleMapIcon},
        {id:5,name:'OMG!',img:images.sampleMapIcon},
        {id:6,name:'title6',img:images.sampleMapIcon},
        {id:7,name:'title7',img:images.sampleMapIcon}
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
            <Image source={item.item.img} style={styles.titleLogo}/>
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