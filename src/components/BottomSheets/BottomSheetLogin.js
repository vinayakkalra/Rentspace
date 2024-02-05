import { Dimensions, StyleSheet, Text, View ,Image} from 'react-native'
import React, { useEffect } from 'react'
import {COLORS, SIZES} from '../../constants/themes'
import {images} from '../../constants'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
// const {height:SCREEN_HEIGHT}=Dimensions.get('window')


const BottomSheetLogin = ({handleLogin,delegationValidation}) => {

const getStorageData=async()=>{
    let data=await AsyncStorage.getItem("delegation")
    return data
}

  useEffect(()=>{
    try{

      const samplePublic="046740ba6cb298256517f176d581f2ac1fbe17272ed60fa285d491f64836cb014701ca09bc31d75f48ce474660a2fa37ac07fe081ccbf9cd67830ccb0872380b45"
      const samplePrivate="308187020100301306072a8648ce3d020106082a8648ce3d030107046d306b020101042028e0c7904802b62fc535f0443f02ebb15f7b7934700d29f1a7359c49a9aec78ba144034200046740ba6cb298256517f176d581f2ac1fbe17272ed60fa285d491f64836cb014701ca09bc31d75f48ce474660a2fa37ac07fe081ccbf9cd67830ccb0872380b45"
      const sampleDelegation=`%7B"delegations"%3A%5B%7B"delegation"%3A%7B"expiration"%3A"17aa79bb17d269e3"%2C"pubkey"%3A"3059301306072a8648ce3d020106082a8648ce3d030107034200046740ba6cb298256517f176d581f2ac1fbe17272ed60fa285d491f64836cb014701ca09bc31d75f48ce474660a2fa37ac07fe081ccbf9cd67830ccb0872380b45"%7D%2C"signature"%3A"d9d9f7a26b6365727469666963617465590489d9d9f7a3647472656583018301830183024863616e697374657283018301830183024a000000000000000701018301830183024e6365727469666965645f6461746182035820b25070569bf60a222844dae72817bdb53142eedd12331ab438f637190a1d133782045820d8f64f7afca6a55d4ee6ded9b0200bac6651caf4c7a1920212b5a03c9bf1df3682045820c3d040747544c2f2b54be19ea6d04fcda96e3420fa80446eb2b5f1db1456111c82045820aa7bfe1273e3c0d2b0ba31c83cfb99571cc85c31c0d4a0cb9918c61feaf129418204582066515dbd1dd629428f5967d5c7c725fc64eb449faf757c41b3a1ef361eb64e7882045820a4d69c0d8cf054a3e07778911d899b73fb6eda6dec093fa3645622f4f98c5db6820458204666b9792213094f73ba1f2eddefb772370bf44f0a6299cc49db0ecca2ad380b82045820dd2aaf123fe7aca5bc5adb89d150d53892e01c3975212723de302a067bbdc91e83018204582038605159862d9339785c591a3f8fed55a674f9e857c947271ec8577ae4dd374883024474696d65820349e3d39d8ac49abcd417697369676e617475726558308653bfb9fb07f76ac4ac707eceaa5a88a4d7e9fc24baaefccb3f7d5968b6c5172e067ecf30f13e940bc74859d1b285ad6a64656c65676174696f6ea2697375626e65745f6964581d43dcaf1180db82fda708ce3ac7a03a6060abde13e9546c60e8cce65d026b636572746966696361746559026ed9d9f7a2647472656583018204582060a7a1afe5422ddced07dd7bd6a07bed2932d15247e45d7b89ba570e5379389d83018302467375626e657483018301830182045820267fe55111b56e3c3975532ea3373f7b72e9f82072fe8e607ed34486478a5b39830182045820466a70286cf9ace9801ca53e22af6ee059a094fd60498606d484b6854058307d83018301820458208b2f6c15078ae4d3b93470915ca53e373327f37ea74ba1b8177d986bb79b31ae8302581d43dcaf1180db82fda708ce3ac7a03a6060abde13e9546c60e8cce65d02830183024f63616e69737465725f72616e67657382035832d9d9f782824a000000000000000701014a00000000000000070101824a000000000210000001014a00000000021fffff010183024a7075626c69635f6b657982035885308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c050302010361008675b634a43e39726238cfe39c9518bc3e3225cb6f5a8479bfcf2b608fba6f8524dcb80f35a8ae44b47f262f0a6620d41279f06fe0c53a739fcca01a48926fe651a3519b5b329ffbecc9f0cb908b098dd3e8845cfb99c56379e049ac465ec806820458202c51db7b5650b7a3dbbb8530a7449cc6f90144778b62f20f3c26d72e95e5069882045820ef8995c410ed405731c9b913f67879e3b6a6b4d659d2746db9a6b47d7e70d3d5820458201fea6be1fb733aebdcd029ce754edbc88fa3776957f26cd1bc41822f3b1fb6ed83024474696d658203499083a9deecc797d417697369676e6174757265583082dc0802bf2436173cbb581ca2b86d1d498d5f9253193ce04617b03cb0c7d16c97561ef870c1cc38aa345d75d599d4826474726565830182045820ea8c1db926fbbe28919ba8e0bbaa3a659a4759d02826e13b5822d7ab2b7511e38302437369678301820458209eeddaf38550f46924f0b1d464592ea17cd1403502456a5517500da2d4c80b5283018204582018429778d7fd25e5f4ca25379e3629a88715173b8bb2bb6e6e936f8dc760449e830183018204582007ef0ebfdd2e4996f4a9cf17165bf9f3964ad9e9828e2bbe55e5f09926c622e78301820458203637152f46f74cf8bd316e15547236a9d9508022e8e8b4599061133a4f17124183025820c9d21275d008af6a4c44a0ec8e7b02842a6f9a8a0cb86c55ed3d117ef74722ca830258208196067ba47dd69dc0afafc9669963dbb5433de6d99ee814a425cb4d07bb2dd88203408204582073cf0bbd001a3ac6219515d73528e29f0a00dc54c28834f3d85715e7cef14838"%7D%5D%2C"publicKey"%3A"303c300c060a2b0601040183b8430102032c000a0000000000000007010131fe2170c52bd239842346f6c7714279f07d1ccd133e0f3237a3d82e140c751f"%7D`
        delegationValidation("",samplePrivate,sampleDelegation)
    }catch(err){
        console.log("delegation validation err : ",err)
        AsyncStorage.clear()
      }
  },[])
  

  const loginMethods=[
    {title:"Astrox",logo:images.astroX},
    {title:"Bitfinity",logo:images.bitfinity},
    {title:"Internet Identity",logo:images.internetIden},
    {title:"Plug",logo:images.plug}
  ]
    
  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.heading}>LOGIN / SIGN UP</Text>
      <FlatList data={loginMethods} renderItem={({item})=>(
        <TouchableOpacity style={styles.loginBtn} onPress={()=>{handleLogin()}}>
          <Image source={item.logo} style={styles.logo}/>
          <Text style={styles.loginBtnText}>{item.title}</Text>
          <Image source={images.next} style={styles.nextIcon} />
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default BottomSheetLogin

const styles = StyleSheet.create({
    heading:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold',
        paddingVertical:5,
        marginTop:5,
        marginBottom:40,
        color:"black"
    },
    bottomSheet:{
        width:"100%",
        backgroundColor:"white",
        position:'absolute',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
    },
    loginBtn:{
        display:'flex',
        flexDirection:'row',
        minWidth:300,
        maxWidth:"80%",
        justifyContent:'space-between',
        alignItems:"center",
        paddingVertical:10,
        borderWidth:1,
        borderColor:COLORS.inputBorder,
        borderRadius:10,
        marginBottom:10,
        
    },
    loginBtnText:{
        fontSize:SIZES.medium,
        width:"40%",
        color:COLORS.inputBorder,
        fontWeight:'bold',
        textAlign:'left'
    },
    nextIcon:{
        //height:"30%",
        marginRight:15
    },
    logo:{
        marginLeft:15
    }
})