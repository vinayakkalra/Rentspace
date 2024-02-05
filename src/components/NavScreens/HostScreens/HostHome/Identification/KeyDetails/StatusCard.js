import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'

const StatusCard = ({item}) => {
  return (
    <View style={styles.card}>
        <Text style={styles.title}>{item?.title}</Text>
        {
            (item?.text!="")?
            <Text style={styles.text}>
                {item?.text}
            </Text>:
            <></>
        }
        
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
    </View>
  )
}

export default StatusCard

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
        color:COLORS.textLightGrey,
        marginBottom:10
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
    }
})