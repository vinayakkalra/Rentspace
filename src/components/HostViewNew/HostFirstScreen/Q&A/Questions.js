import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Question from './Question'

const questions=[
  {
    question:"Is my place right for Rentspace?",
    answer:"Its upto you to decide"
  },
  {
    question:"Do have to host all the time?",
    answer:"Its upto you to decide"
  },
  {
    question:"How much should I interact with guests?",
    answer:"Its upto you to decide"
  },
  {
    question:"Any tips on being a great Rentspace Host?",
    answer:"Its upto you to decide"
  },
  {
    question:"What are Rentspace's fees?",
    answer:"Its upto you to decide"
  },
]

const Questions = () => {
  const [Ques,setQues]=useState(-1)
  return (
    <View style={styles.cont}>
      <Text style={styles.title}>Your questions, answered</Text>
      <View style={styles.hrLine}/>
      {
        questions.map((ques,index)=>{
          return(
            <>
              <Question 
                key={index}
                index={index}
                question={ques.question} 
                answer={ques.answer}
                setQues={setQues}
                Ques={Ques}
              />
              {
                (index==4)?<View style={{marginBottom:30}}/>:<View style={styles.hrLine}/>
              }
              
            </>
          )
        })
      }
    </View>
  )
}

export default Questions

const styles = StyleSheet.create({
  cont:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    width:'100%',
    backgroundColor:COLORS.bgLightGrey,
    paddingTop:15,
    marginTop:30
  },
  title:{
    color:COLORS.black,
    fontSize:SIZES.xLarge,
    fontWeight:'700',
    marginBottom:10,
    width:'60%',
    marginLeft:'7.5%'
  },
  hrLine:{
    height:1,
    borderBottomWidth:1,
    borderBottomColor:COLORS.textLightGrey,
    width:"100%",
    marginTop:10,
    marginBottom:5,
    opacity:0.2
  },
})