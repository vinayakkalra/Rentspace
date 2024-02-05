import { Image, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator, Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { images } from '../../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import { setHotels } from '../../../../redux/hotels/actions'
import { setChatToken } from '../../../../redux/chatToken/actions'
import axios, { formToJSON } from 'axios'
import { FileSystem } from 'react-native-file-access'

const Congratulations = ({setHostModal,pos}) => {
  const [loading,setLoading]=useState(false)
  const [token,setToken]=useState("")
  const {listing}=useSelector(state=>state.listingReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const {authData}=useSelector(state=>state.authDataReducer)
  const dispatch=useDispatch()
  // const baseUrl="https://rentspace.kaifoundry.com"
  const baseUrl="http://localhost:5000"
  const {files}=useSelector(state=>state.filesReducer)
  
  const ApiLogin=async()=>{
    console.log("files",files)
    // console.log(`authData : ${authData}\n principal : ${authData.principal}\n publicKey : ${authData.publicKey}`)
    // console.log({
    //     principal:authData.principal,
    //     publicKey:authData.publicKey
    //  })
     await axios.post(`${baseUrl}/api/v1/login/user`,{},{headers:{
      "x-private":authData.privateKey,
      "x-public":authData.publicKey,
      "x-delegation":authData.delegation
     }}).then((res)=>{
        console.log('hotel login api : ',res.data.userToken)
        dispatch(setChatToken(res.data.userToken))
        setToken(res.data.userToken)
     })
    }
    useEffect(()=>{
      ApiLogin()
    },[])
    const ApiHotelFilters=async()=>{
      await axios.get(`${baseUrl}/api/v1/hotel/filters`).then((res)=>{
        console.log("hotel filters resp : ")
      }).catch((err)=>{console.log("hotel filters err : ",err)})
    }
    const ApiHotelCreate=async()=>{
      const data={
        hotelTitle:listing?.hotelTitle,
        hotelDes:listing?.hotelDes,
        hotelPrice:listing?.hotelPrice,
        hotelLocation:"Ludhiana",
        longitude:parseFloat(listing?.hotelLocation.split('#')[0]),
        latitude:parseFloat(listing?.hotelLocation.split('#')[1])
      }
      
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      let newFiles=[]
      await FileSystem.readFile(files[0].uri,'base64').then((res)=>{
        console.log(res)
        files.map((file,index)=>{
          // if(index==0){
          //   newFiles.push({...file,fileIndex:`file${index}`,base64:res})
          //   formData.append(`file${index}`,file)
          // }else{
            newFiles.push({...file,fileIndex:`file${index}`})
            formData.append(`file${index}`,file)
          // }
          
          // console.log(`file${index}`,file)
        })
      })
      
      
      // let newFiles=[]
      // const filePromises = files.map(async function (file) {
      //   const res = await FileSystem.readFile(file.uri);
      //   // console.log(res)
      //   return { ...file, buffer: res };
      // });
      
      formData.append("files",JSON.stringify(newFiles))
      
      
      // Promise.all(filePromises)
      //   .then((newFiles) => {
      //     const regularNewFiles = newFiles.map((file) => Object.assign({}, file));
      //     newFiles.forEach((file) => {
      //       console.log("File Object: ", file);
      //     });
      //     // console.log("files: ", JSON.stringify(regularNewFiles));
      //     formData.append("files", JSON.stringify(regularNewFiles));
          
      
      //     // Continue with the rest of your code that depends on newFiles
      //   })
      //   .catch((error) => {
      //     // Handle errors if any of the promises are rejected
      //     console.error("Error reading files:", error);
      //   });
      console.log(formData)
      await axios.post(`${baseUrl}/api/v1/hotel/register`,formData,{
        headers:{
          "x-private":authData.privateKey,
          "x-public":authData.publicKey,
          "x-delegation":authData.delegation,
          "Content-Type":"multipart/form-data"
        }
      }).then(async(res)=>{
        setHostModal(false)
        
        console.log("hotel creation api response videos : ",res.data)
        // console.log("hotels images : ",res.data.hotels[res.data.hotels.length-1].imagesUrls)
      }).catch((err)=>{
        console.log("hotel creation api err : ",err)
        alert(err)
        setHostModal(false)
      })
    }
  const createHotel=async()=>{
    console.log('create hotel : ',listing)
  //   setLoading(true)
  // await actors.hotelActor?.createHotel({...listing,hotelLocation:"Ludhiana"}).then(async(res)=>{
  //   setLoading(false)
  //   await actors.hotelActor?.getHotelId().then(async(res)=>{
  //     console.log(res)
  //     dispatch(setHotels(res))
      
      ApiHotelFilters()
      ApiHotelCreate()
    // })

  // }).catch((err)=>{
  //   setLoading(false)
  //   alert(err)
  //   console.log(err)})
  // }
  }
  return (
    <View style={styles.view}>
      <Image source={images.congrats} style={styles.img}/>  
      <Text style={styles.title}>Congratulations, Lucy</Text>
      <Text style={styles.text}>
        From one Host to another - welcome aboard.
        Thank you for sharing your home and helping to create incredible experiences for our guests.    
      </Text>
      <Text style={styles.subtitle}>
      Brian Chesky, CEO
      </Text>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={createHotel}>
            <Text style={styles.btnText}>Let’s get started</Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator size={40} animating={loading} style={styles.loader}/>
    </View>
  )
}

export default Congratulations

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:20,
        marginLeft:'7.5%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginBottom:15,
        marginLeft:'7.5%'
    },
    subtitle:{
        fontSize:SIZES.xLarge,
        color:COLORS.black,
        fontWeight:'600',
        marginLeft:'7.5%'
    },
    img:{
        marginTop:60,
        marginBottom:25,
        marginLeft:'7.5%'
    },
    btnView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white',
        elevation:15,
        width:'100%',
        paddingVertical:20,
        position:'absolute',
        bottom:0
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'90%',
        paddingVertical:15,
        backgroundColor:COLORS.hostTitle,
        borderRadius:10
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'white'
    },
    loader:{
      position:'absolute',
      top:'45%',
      left:'45%'
    }
})