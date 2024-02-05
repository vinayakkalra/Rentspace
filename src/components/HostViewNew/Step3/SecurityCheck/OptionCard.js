import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'

const OptionCard = ({item,setOption,option,check}) => {

    const setCheck=()=>{
        switch(item){
            case("Security camera"):
                setOption({...option,security:!option?.security})
                break
            case("Weapons"):
                setOption({...option,weapon:!option?.weapon})
                break
            case("Dangerous animals"):
                setOption({...option,animal:!option?.animal})
                break
        }
    }
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item}</Text>
      <TouchableOpacity style={styles.checkBox} onPress={setCheck}>
        <Icon name='check' color={check?COLORS.textLightGrey:'white'} size={18}/>
      </TouchableOpacity>
    </View>
  )
}

export default OptionCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:'7.5%',
        width:'85%',
        marginVertical:20
    },
    checkBox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1.2,
        borderColor:COLORS.textLightGrey,
        borderRadius:4,
    },
    title:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        fontWeight:'500'
    }
})