import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { images } from '../../../constants'
import { COLORS, SIZES } from '../../../constants/themes'

const SearchMap = () => {
    const [mapValue,setMapValue]=useState('')
  return (
    <View style={styles.cont}>
      <View style={styles.searchBar}>
        <Icon name="search1" size={30} style={{marginHorizontal:10}} color={COLORS.textLightGrey}/>
        <TextInput 
            placeholder='Ludhiana • Entire place • 2 bedrooms ' 
            value={mapValue} 
            placeholderTextColor={COLORS.textLightGrey}
            onChangeText={(value)=>setMapValue(value)}
            style={styles.input}
        />
      </View>
      <Image source={images.map1} style={styles.img}/>
    </View>
  )
}

export default SearchMap

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
    },
    searchBar:{
        borderColor:COLORS.mediumGrey,
        borderWidth:1,
        display:'flex',
        width:'95%',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical:20,
        alignItems:'center',
        borderRadius:40,

    },
    img:{
        marginBottom:40,
        
    },
    input:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey
    }

})