import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'

const Question = ({index,question,answer,setQues,Ques}) => {
  return (
    <View style={styles.quesCont}>
      <TouchableOpacity onPress={()=>setQues(index)}>
        <Text style={styles.question}>
          {question}
        </Text>
      </TouchableOpacity>
      {
        (index==Ques)?<Text style={styles.answer}>{answer}</Text>:<></>
      }
      
    </View>
  )
}

export default Question

const styles = StyleSheet.create({
  quesCont:{
    display:'flex',
    flexDirection:'column',
    marginLeft:'7.5%',
    width:'85%'
  },
  question:{
    fontSize:SIZES.preMedium,
    color:COLORS.textLightGrey,
    opacity:0.8,
    marginVertical:15
  },
  answer:{
    backgroundColor:'white',
    color:COLORS.black,
    fontSize:SIZES.preMedium,
    paddingVertical:20,
    borderRadius:10,
    paddingLeft:20
  }
})