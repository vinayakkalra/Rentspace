import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'

const RatingCont = ({review,setReview}) => {
  return (
    <View style={styles.cont}>
      <Text style={styles.title}>How satisfied are you with us...</Text>
      <View style={styles.startCont}>
        <TouchableOpacity 
            style={(review.rating>0)?styles.star:[styles.star,{opacity:0.3}]} 
            onPress={()=>setReview({...review,rating:1.0})}
        >
            <Icon name='star' color={(review.rating>0)?COLORS.gold:COLORS.hostTitle} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={(review.rating>1)?styles.star:[styles.star,{opacity:0.3}]} 
            onPress={()=>setReview({...review,rating:2.0})}
        >
            <Icon name='star' color={(review.rating>1)?COLORS.gold:COLORS.hostTitle} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={(review.rating>2)?styles.star:[styles.star,{opacity:0.3}]} 
            onPress={()=>setReview({...review,rating:3.0})}
        >
            <Icon name='star' color={(review.rating>2)?COLORS.gold:COLORS.hostTitle} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={(review.rating>3)?styles.star:[styles.star,{opacity:0.3}]} 
            onPress={()=>setReview({...review,rating:4.0})}
        >
            <Icon name='star' color={(review.rating>3)?COLORS.gold:COLORS.hostTitle} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={(review.rating>4)?styles.star:[styles.star,{opacity:0.3}]} 
            onPress={()=>setReview({...review,rating:5.0})}
        >
            <Icon name='star' color={(review.rating>4)?COLORS.gold:COLORS.hostTitle} size={35}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RatingCont

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'95%',
        marginTop:20,
        marginBottom:25
    },
    title:{
        fontSize:SIZES.large-2,
        color:COLORS.black,
        fontWeight:'bold'
    },
    startCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:12
    },
    star:{
        marginRight:4,
        
    }
})