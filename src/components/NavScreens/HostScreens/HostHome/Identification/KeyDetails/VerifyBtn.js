import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Entypo'
import { COLORS,SIZES } from '../../../../../../constants/themes'

const VerifyBtn = ({item,setIdprocess,pos}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{setIdprocess(pos+1)}}>
      <Icon3 name='chevron-small-right' size={28} color={COLORS.textLightGrey} style={styles.iconNext}/>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.text}>{item?.text}</Text>
      <View style={styles.statusCont}>
            {
                (item?.status=="Complete")?
                <>
                    <Icon name="checkcircleo" size={18} color={COLORS.lightGreen}/>
                </>
                :
                <Icon2 name='warning' size={18} color='red'/>
            }
            <Text style={styles.status}>{item?.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerifyBtn

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginVertical:5,
        width:'82%',   
    },
    title:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        marginBottom:10,
        fontWeight:'700'
    },
    text:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        fontWeight:'300',
        width:'85%',
        marginBottom:5
    },
    statusCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    status:{
        fontSize:SIZES.small,
        fontWeight:'bold',
        color:'black',
        marginLeft:5
    },
    iconNext:{
        position:'absolute',
        top:'5%',
        right:'1%'
    }
})