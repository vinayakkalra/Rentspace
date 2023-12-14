import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../constants/themes'

const ModalSafety = ({setSafetyModal}) => {
  return (
    <View style={styles.bottomSheet}>
        <TouchableOpacity style={styles.backIcon} onPress={()=>{setSafetyModal(false)}}>
            <Icon name="angle-left" size={30} color={COLORS.textLightGrey}/>    
        </TouchableOpacity>
        <Text style={styles.heading}>
            Safety & property
        </Text>
        <Text style={styles.simpleText}>
        Avoid surprises by looking over these important details about your Host's property.
        </Text>
        <Text style={styles.subHeading}>
            Safety Devices
        </Text>
        <View style={styles.subSec}>
            <Text style={styles.subSecHeading}>
            A Carbon monoxide alarm not reported
            </Text>
            <Text style={styles.subSecSimpleText}>
            The host hasn't reported a carbon monoxide alarm on the property. We suggest bringing a portable detector for your trip.
            </Text>
        </View>
        <View style={styles.hrLine}></View>
        <View style={styles.subSec}>
            <Text style={styles.subSecHeading}>
            A Carbon monoxide alarm not reported
            </Text>
            <Text style={styles.subSecSimpleText}>
            The host hasn't reported a carbon monoxide alarm on the property. We suggest bringing a portable detector for your trip.
            </Text>
        </View>
        <View style={styles.hrLine}></View>
        <View style={styles.subSec}>
            <Text style={styles.subSecHeading}>
            A Carbon monoxide alarm not reported
            </Text>
            <Text style={styles.subSecSimpleText}>
            The host hasn't reported a carbon monoxide alarm on the property. We suggest bringing a portable detector for your trip.
            </Text>
        </View>
    </View>
  )
}

export default ModalSafety

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },
    backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        marginVertical:10,
        justifyContent:'flex-start',

    },
    heading:{
        width:"80%",
        fontSize:SIZES.xLarge,
        fontWeight:'bold',
        color:"black",
        marginBottom:15,
        marginTop:25
    },
    subHeading:{
        width:"80%",
        fontSize:SIZES.large,
        fontWeight:'bold',
        color:"black",
        marginBottom:15
    },
    simpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'80%',
        marginBottom:25
    },
    subSec:{
        width:'80%'
    },
    subSecHeading:{
        width:"100%",
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:"black",
        marginBottom:10
    },
    subSecSimpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'100%',
        marginBottom:15
    },
    hrLine:{
        height:2,
        borderBottomWidth:2,
        borderBottomColor:COLORS.hrLine,
        width:"100%",
        marginBottom:20
    }
})