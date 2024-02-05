import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../constants/themes'
import { images } from '../../../constants'
import SaveBtn from '../Reusables/SaveBtn'
import BottomBtn from '../Reusables/BottomBtn'

const Step2 = ({setHostModal,pos}) => {
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} nextFunc={()=>{return true}}/>
      <View style={styles.imageCont}>
        <Image source={images.hostHouseDesign} style={styles.bigImg}/>
        <View style={styles.smallImgCont}>
            <Image source={images.hostMirror} style={styles.smallImg}/>
            <Image source={images.hostDoor} style={[styles.smallImg,{marginLeft:40}]}/>
        </View>
      </View>
      <Text style={styles.subTitle}>Step 2</Text>
      <Text style={styles.title}>Make your place stand out</Text>
      <Text style={styles.text}>
      Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.
      </Text>
    </View>
  )
}

export default Step2

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    imageCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'90%',
        marginLeft:'5%',
        marginVertical:30
    },
    smallImgCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        height:'100%'
    },
    bigImg:{
        width:'60%',
        height:190,
        marginTop:20
    },
    smallImg:{
       width:95,
       height:95
    },
    title:{
        width:'88%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:15,
        marginTop:0,
        marginLeft:'6%'
    },
    subTitle:{
        fontSize:SIZES.largeMed,
        fontWeight:'bold',
        color:'black',
        marginLeft:'7.5%',
        marginBottom:0
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%'
    }
})