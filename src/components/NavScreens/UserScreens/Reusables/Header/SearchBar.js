import { StyleSheet, Text, TouchableOpacity, View ,TextInput} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../../constants/themes'

const SearchBar = ({filterAction}) => {
  return (
    <View style={styles.searchBarCont}>
      <View style={styles.searchBar}>
        <Icon name="search1" size={22} color={'white'}/>
        <TextInput style={styles.input} placeholder='Where are you going?' placeholderTextColor={'white'} />
      </View>
      <TouchableOpacity style={styles.filterCont} onPress={filterAction}>
        <Icon name="filter" size={25} color={'white'}/>
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        alignItems:'center'
    },
    searchBar:{
        display:'flex',
        flexDirection:'row',
        width:'83%',
        height:55,
        justifyContent:'flex-start',
        padding:15,
        backgroundColor:COLORS.lightPurple,
        borderRadius:60,
        borderColor:COLORS.lightBorderPurple,
        borderWidth:2,
        alignItems:'center',
        marginRight:15,
    },
    input:{
        height:'60%',
        marginLeft:15,
        color:'white',
        fontSize:SIZES.small,
        padding:0,
        
    },
    filterCont:{
        height:40,
        width:40,
        backgroundColor:COLORS.lightPurple,
        borderColor:COLORS.lightBorderPurple,
        borderRadius:25,
        borderWidth:2,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})