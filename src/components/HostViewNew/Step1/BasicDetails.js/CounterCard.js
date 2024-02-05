import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'

const CounterCard = ({title,counts,setCounts,self}) => {

  const increment=()=>{
    switch(self){
        case(1):
            setCounts({...counts,guests:counts?.guests+1})
            break
        case(2):
            setCounts({...counts,bedrooms:counts?.bedrooms+1})
            break
        case(3):
            setCounts({...counts,beds:counts?.beds+1})
            break
        case(4):
            setCounts({...counts,bathrooms:counts?.bathrooms+1})
            break
    }
  }
  const decrement=()=>{
    switch(self){
        case(1):
            if(counts?.guests<=0){
                alert('You have already selected minimum number of Guests!')
                break
            }
            setCounts({...counts,guests:counts?.guests-1})
            break
        case(2):
            if(counts?.bedrooms<=0){
                alert('You have already selected minimum number of Bedrooms!')
                break
            }
            setCounts({...counts,bedrooms:counts?.bedrooms-1})
            break
        case(3):
            if(counts?.beds<=0){
                alert('You have already selected minimum number of Beds!')
                break
            }
            setCounts({...counts,beds:counts?.beds-1})
            break
        case(4):
            if(counts?.bathrooms<=0){
                alert('You have already selected minimum number of Bathrooms!')
                break
            }
            setCounts({...counts,bathrooms:counts?.bathrooms-1})
            break
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.counterCont}>
        <TouchableOpacity style={styles.btn} onPress={decrement}>
            <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
            {
                (self==1)?counts?.guests:
                (self==2)?counts?.bedrooms:
                (self==3)?counts?.beds:
                counts?.bathrooms
            }
        </Text>
        <TouchableOpacity style={styles.btn} onPress={increment}>
            <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CounterCard

const styles = StyleSheet.create({
    card:{
        width:'80%',
        marginLeft:'8%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:5
    },
    title:{
        fontSize:SIZES.medium,
        color:COLORS.textLightGrey,
        fontWeight:"800",
    },
    counterCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'25%'
    },
    btn:{
        width:26,
        height:26,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        borderColor:COLORS.textLightGrey,
        borderWidth:1
    },
    btnText:{
        fontSize:SIZES.xLarge,
        fontWeight:'200',
        color:COLORS.textLightGrey,
        width:22,
        height:22,
        marginBottom:10,
        textAlign:'center'
    }
})