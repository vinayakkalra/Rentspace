import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../../../constants'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'

const ListingCard = () => {
  return (
    <View style={styles.card}>
      <Image source={images.hotelImg1} style={styles.img}/>
      <View style={styles.textCont}>
        <View style={styles.textSubCont}>
            <Text style={styles.boldText}>Listing name</Text>
            <Text style={styles.normalText}>
                <Text style={styles.normalTextCrossed}>
                    $1098
                </Text>
                {" "}
                <Text style={styles.boldText}>
                    $798
                </Text>
                /night
            </Text>
        </View>
        <View style={styles.tagCont}>
            <Text style={styles.tag}>New{" "}</Text>
            <Icon name='star' color='black' size={10}/>
        </View>
      </View>
    </View>
  )
}

export default ListingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        height:200,
        width:'65%',
        elevation:5,
        backgroundColor:'white',
        borderRadius:12
    },
    img:{
        width:'93%',
        height:'70%',
        marginBottom:5,
        borderRadius:10
    },
    textCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        width:'94%'
    },
    textSubCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    },
    boldText:{
        fontSize:SIZES.small,
        color:COLORS.black,
        fontWeight:'700'
    },
    normalText:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.5
    },
    normalTextCrossed:{
        textDecorationLine:'line-through'
    },
    tag:{
        fontSize:SIZES.xSmall,
        color:COLORS.black,
        fontWeight:'600',
    },
    tagCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    }
})