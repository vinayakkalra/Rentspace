import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import DetailedComparison from './DetailedComparison'
import NormalComparison from './NormalComparison'

const comparisons=[
  {
    type:'detailed',
    heading:'Guest identity verification',
    text:'Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.',
    rent:true,
    comp:true
  },
  {
    type:'detailed',
    heading:'Reservation screening',
    text:'Our proprietary technology analyses hundreds of factors in each reservation and blocks certain bookings that show a high risk for disruptive parties and property damage.',
    rent:true,
    comp:false
  },
  {
    type:'detailed',
    heading:'$3m damage protection',
    text:'Rentspace reimburses you for damage caused by guests to your home and belongings and includes these specialised protections:',
    rent:true,
    comp:false
  },
  {
    type:'normal',
    heading:'Art & valuables',
    text:'',
    rent:true,
    comp:false
  },
  {
    type:'normal',
    heading:'Auto & boat',
    text:'',
    rent:true,
    comp:false
  },
  {
    type:'normal',
    heading:'Pet damage',
    text:'',
    rent:true,
    comp:false
  },
  {
    type:'normal',
    heading:'Income loss',
    text:'',
    rent:true,
    comp:false
  },
  {
    type:'normal',
    heading:'Deep cleaning',
    text:'',
    rent:true,
    comp:false
  },
  {
    type:'detailed',
    heading:'$1m USD liability insurance',
    text:"You're protected in the rare event that a guest gets hurt or their belongings are damaged or stolen.",
    rent:true,
    comp:true
  },
  {
    type:'detailed',
    heading:"24-hour safety line",
    text:"If you ever feel unsafe, our app provides one-tap access to specially trained safety agents, day or night.",
    rent:true,
    comp:true
  },
]

const ComparisonFeatures = () => {
  return (
    <View style={styles.cont}>
      <Text style={styles.subTitle}><Text style={styles.title}>Rent Cover </Text> for Hosts</Text>
      <Text style={styles.subTitle2}>Rent space it with 360 protection</Text>
      <View style={styles.headingCont}>
        <Text style={styles.heading}>Rentspace</Text>
        <Text style={[styles.heading,{marginLeft:'5%'}]}>Competitors</Text>
      </View>
      <View style={styles.hrLine}/>
      {
        comparisons.map((item,index)=>{
          if(item.type=='detailed'){
            return(
              <>
                <DetailedComparison 
                  key={index}
                  heading={item.heading}
                  text={item.text}
                  rent={item.rent}
                  comp={item.comp}
                />
               <View style={styles.hrLine}/>
              </>
            )
          }else{
            return(
              <>
                <NormalComparison
                  key={index}
                  heading={item.heading}
                  rent={item.rent}
                  comp={item.comp}
                />
                <View style={styles.hrLine}/>
              </>
            )
          }
        })
        
      }
      <View style={styles.btnCont}>
        <Text style={styles.linkText}>
          Comparison is based on public information and free offerings by top competitors as of 22/10. Find details and exclusions here.
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ComparisonFeatures

const styles = StyleSheet.create({
  cont:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'flex-start',
    width:'100%',
  },
  title:{
    color:COLORS.hostTitle,
    fontSize:SIZES.xxLarge,
    fontWeight:'500',
    marginBottom:5,
    marginTop:10,  
  },
  subTitle:{
    color:COLORS.black,
    fontSize:SIZES.large,
    fontWeight:'500',
    marginBottom:10,
    marginLeft:'7.5%'
  },
  subTitle2:{
    color:COLORS.black,
    fontSize:SIZES.xLarge,
    fontWeight:'700',
    marginBottom:24,
    width:'60%',
    marginLeft:'7.5%'
  },
  headingCont:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    width:'85%',
    marginLeft:'7.5%'
  },
  hrLine:{
    height:2,
    borderBottomWidth:2,
    borderBottomColor:COLORS.hrLine,
    width:"100%",
    marginTop:10,
    marginBottom:15
  },
  heading:{
    color:COLORS.textLightGrey,
    opacity:0.7,
    fontSize:SIZES.preMedium
  },
  btnCont:{
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    width:'85%',
    marginLeft:'7.5%'
  },
  btn:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
    width:'40%',
    backgroundColor:COLORS.hostTitle,
    borderRadius:10
  },
  btnText:{
    fontSize:SIZES.medium,
    color:'white',
    fontWeight:'bold'
  },
  linkText:{
    fontSize:SIZES.xSmall,
    color:COLORS.textLightGrey,
    textDecorationLine:'underline',
    marginBottom:25,
    fontWeight:'bold',
    opacity:0.6,
    lineHeight:15
  }
})