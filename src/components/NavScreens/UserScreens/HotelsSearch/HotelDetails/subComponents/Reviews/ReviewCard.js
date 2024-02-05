import { StyleSheet, Text, View,Image ,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS, SIZES } from '../../../../../../../constants/themes'
import { images } from '../../../../../../../constants'

const months=["January","Febraury","March","April","May","June","July","August","September","October","November","December"]

const ReviewCard = ({item}) => {
  const rating=4
  let ratingArr=new Array(item?.rating)
  ratingArr.fill(1)
  // console.log((ratingArr))
    // let date=item?.date
    // let month=Number(date.charAt(3)+date.charAt(4))
    // let year=Number(date.charAt(6)+date.charAt(7)+date.charAt(8)+date.charAt(9))
    // console.log(month,year)
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={images.profileSample}/>
      <View style={styles.dateCont}>
        {
          ratingArr.map((r,index)=>(
            <Icon key={index} name="star" size={16} color={COLORS.hostTitle}/>
          ))
        }
        
        {/* <Icon name="star" size={16} color={COLORS.hostTitle} />
        <Icon name="star" size={16} color={COLORS.hostTitle} />
        <Icon name="star" size={16} color={COLORS.hostTitle} />
        <Icon name="star" size={16} color={COLORS.hostTitle} /> */}
        {/* <Text style={styles.dateText}>{months[month-1]+" "+year}</Text> */}
        <Text style={styles.dateText}>{item?.title}</Text>
      </View>
      <Text style={styles.normalText}>{item?.des}</Text>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
  card:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:COLORS.gold,
    width:300,
    borderRadius:12,
    opacity:1,
    marginRight:20,
    maxHeight:130,
    minHeight:110,
    marginVertical:10
  },
  dateCont:{
    display:'flex',
    flexDirection:'row',
    width:'77%',
    marginTop:10
  },
  img:{
    width:40,
    height:40,
    borderRadius:30,
    position:'absolute',
    top:-7,
    left:-7,
    opacity:1
  },
  dateText:{
    fontSize:SIZES.preMedium-1,
    color:COLORS.black,
    marginLeft:10,
    fontWeight:'bold',
    opacity:0.9
  },
  normalText:{
    width:'80%',
    color:COLORS.textLightGrey,
    fontSize:SIZES.small,
    fontWeight:'300',
    
  }
})