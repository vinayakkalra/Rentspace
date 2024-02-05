import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import { createTokenActor, formatTokenMetaData } from './utils'
import {Principal} from "@dfinity/principal"
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'
import PushNotification from 'react-native-push-notification'

const PaymentScreen =({setBooking,booking,item,self}) => {

  // code for the transation starts from here
  const [payment,setPayment]=useState(0)
    const {actors}=useSelector(state=>state.actorReducer)
    const {principle}=useSelector(state=>state.principleReducer)
    const [userId,setUserId]=useState("sample")
  const [metaData,setMetaData] = useState(null);
  const [Balance,setBalance]=useState(0)
  const {user}=useSelector(state=>state.userReducer)
  const [loading,setLoading]=useState(false)
  async function settingToken(){
    // console.log("first")
    // setTokenActor(createTokenActor("ryjl3-tyaaa-aaaaa-aaaba-cai"));
    console.log("token actor",actors?.tokenActor)
    await actors.tokenActor.icrc1_metadata().then((res)=>{
      console.log(res)
      
      setMetaData(formatTokenMetaData(res))
    }).catch((err)=>{console.log(err)})
    console.log("metadate:",metaData);
  }

  // function  for the transfer
  const getBalance=async()=>{
    let bal=await actors?.tokenActor.icrc1_balance_of({ owner: Principal.fromText(principle) , subaccount: [] })
    console.log("balance : ",parseInt(bal))
    setBalance(parseInt(bal))
    return parseInt(bal)
  }
  useEffect(()=>{
    getBalance()
    PushNotification.createChannel({
      channelId:'1',
      channelName:'booking'
    },()=>{console.log(("booking norification channel created!"))})
  },[])
  const transfer=async (sendAmount,sendPrincipal) =>{
    console.log("metaData[decimals]",metaData)
    let amnt=parseInt(Number(sendAmount) * Math.pow(10, parseInt(metaData?.["icrc1:decimals"])))
    
    console.log("amount",amnt)
    if(Balance>=amnt){
      let transaction = {
        amount: amnt,
        from_subaccount: [],
        to: {
          owner: Principal.fromText(sendPrincipal),
          subaccount: [],
        },
        fee: [metaData?.["icrc1:fee"]],
        memo: [],
        created_at_time: [],
      };
      console.log("metadata inside transfer fee",metaData?.["icrc1:fee"])
    let response = await actors?.tokenActor.icrc1_transfer(transaction);
    console.log(response)
    // alert("transaction successful!")
    setBooking({...booking,paymentStatus:true})
    PushNotification.localNotification({
      title:"Booking Successful!",
      message:`${user?.firstName}, your booking for ${item?.hotelTitle} is successful!`,
      channelId:"1"
    })
    self.current.dismiss()
    }else{
      alert("Insufficient balance")
    }
    };
    
    const getOwner=()=>{
        setUserId(item?.id.split('#')[0])
        console.log(userId)
        setPayment(Number(booking.bookingDuration)*Number(item?.hotelPrice))
        console.log(Number(booking.bookingDuration)*Number(item?.hotelPrice))
    }
    useEffect(()=>{
        getOwner()
        settingToken()
    },[])
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Your Current Balance : {100}</Text>
      <Text style={styles.title}>Hotel Name: {item?.hotelTitle}</Text>
      {/* <Text style={styles.title}>Sender's id: {"  "}<Text style={{color:COLORS.hostTitle}}>"{principle?.toString()}"</Text></Text>
      <Text style={styles.title}>Receiver's id:{"  "} <Text style={{color:COLORS.hostTitle}}>"{userId.toString()}"</Text></Text> */}
      <TextInput 
        style={styles.inputs}
        value={"$"+payment.toString()}/>
        {/* // placeholder="Amount"
        // placeholderTextColor={COLORS.textLightGrey}
        // onChangeText={value=>setPayment(value.toString())}/> */}
        <TouchableOpacity style={styles.btn} onPress={()=>{
          transfer(payment/1000000000,userId)
        }}>
            <Text style={styles.btnText}>Confirm Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>self.current.dismiss()}>
            <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        paddingTop:20
      },
      title:{
        color:COLORS.black,
        fontWeight:'400',
        fontSize:SIZES.preMedium,
        marginBottom:10,
        width:'80%'
      },
      inputs:{
        borderColor: COLORS.hostTitle,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 40,
        height: 50,
        padding: 15,
        color: COLORS.textLightGrey,
        fontSize: SIZES.preMedium,
        marginTop:15
      },
      btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        width:'80%',
        paddingVertical:15,
        marginBottom:12,
        
      },
      btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium,
      }
})