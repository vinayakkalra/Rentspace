import { StyleSheet, Text, View,ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import Icon from 'react-native-vector-icons/Entypo'
import { images } from '../../../../constants'

const ReorderPhotos = ({setHostModal,pos}) => {
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <View style={styles.headerCont}>
            <View style={styles.textCont}>
                <Text style={styles.heading}>
                    Ta-da! How does this look?
                </Text>
                <Text style={styles.text}>
                    Drag to reorder
                </Text>
            </View>
            <TouchableOpacity style={styles.Addbtn}>
            <Icon name='plus' size={20} color={COLORS.textLightGrey}/>
                <Text style={styles.AddbtnText}>Add more</Text>
            </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={styles.subView}>
        <View style={styles.bigImgCont}>
            <Image source={images.hotelImg1} style={styles.bigImg}/>
        </View>
       
        <View style={styles.imgCont}>
            <Image source={images.hotelImg2} style={styles.smallImg}/>
            <Image source={images.hotelImg3} style={styles.smallImg}/>
        </View>
        <View style={styles.imgCont}>
            <Image source={images.hotelImg4} style={styles.smallImg}/>
            <Image source={images.hotelImg5} style={styles.smallImg}/>
        </View>
        <View style={styles.iconCont}>
            <TouchableOpacity style={styles.plusIcon}>
                <Icon name='plus' size={30} color={COLORS.textLightGrey} style={styles.icon}/>
            </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} back={2} nextFunc={()=>{return true}}/>
    </View>
  )
}

export default ReorderPhotos

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    subView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
    },
    headerCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'82%',
        marginLeft:'7.5%',
        alignItems:'flex-start'
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        width:'65%',
        alignItems:'flex-start',
    },
    heading:{
        fontWeight:'bold',
        fontSize:SIZES.medium,
        color:'black',
        marginVertical:8
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        opacity:0.6,
        marginBottom:10
    },
    Addbtn:{
        display:'flex',
        flexDirection:'row',
        paddingVertical:10,
        borderColor:COLORS.hostTitle,
        borderWidth:1,
        borderRadius:25,
        alignItems:'center',
        paddingHorizontal:10
    },
    AddbtnText:{
        fontWeight:'bold',
        fontSize:SIZES.small,
        color:'black',
    },
    imgCont:{
        width:'80%',
        marginLeft:'7.5%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    bigImgCont:{
        width:'82%',
        marginLeft:'7.5%',
        width:310
    },
    bigImg:{
        marginBottom:10,
        height:170,
        width:'100%',
        borderRadius:20
    },
    smallImg:{
        marginBottom:10,
        width:140,
        height:80,
        borderRadius:10,
        objectFit:'fill'
    },
    iconCont:{
        width:'80%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:'7.5%',
        marginTop:100
    },
    plusIcon:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderStyle:'dashed',
        borderWidth:1,
        borderColor:COLORS.textLightGrey,
        width:50,
        height:50,
        borderRadius:30,
        
    },
    icon:{
        opacity:0.5
    }
})