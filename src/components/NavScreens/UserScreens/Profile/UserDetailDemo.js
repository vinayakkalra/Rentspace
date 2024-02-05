import { ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity, View, Modal, ScrollView } from 'react-native'
import  { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import { User } from '../../../../declarations/User/index.js'
import {hotel} from '../../../../declarations/hotel/index.js'
import { images } from '../../../../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../../../../redux/users/actions'
import { setHotels } from '../../../../redux/hotels/actions'
import HostWelcomeManager from '../../../HostViewNew/HostWelcomeManager'
import Step1Manager from '../../../HostViewNew/Step1Manager'
import Step2Manager from '../../../HostViewNew/Step2Manager'
import Step3Manager from '../../../HostViewNew/Step3Manager'
import BottomNav from '../../../Navigation/BottomNav'
import UpdateProfile from './Modals/UpdateProfile'
import { useRoute } from '@react-navigation/native'
import { createActor as createUserActor  } from '../../../../declarations/User'
import { createActor as createHotelActor } from '../../../../declarations/hotel'
import { createActor } from '../../../../declarations/backend'
import { setActor } from '../../../../redux/actor/actions'

const UserDetailDemo = ({navigation}) => {

  const {user}=useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  const [editProfile,setEditProfile]=useState(false)
  const [createHotel,setCreateHotel]=useState(false)
  const [noListing,setNoListing]=useState(false)
  const [loading,setLoading]=useState(false)


  const getHotelList=async()=>{
    await actors.hotelActor.getHotelId().then((res)=>{
      console.log(res)
      dispatch(setHotels(res))
    }).catch((err)=>{
        console.log(err)
        setNoListing(true)
        dispatch(setHotels([]))
    })
  }

  useEffect(()=>{
    getHotelList()
  },[])

  const makeHost=async()=>{
    setLoading(true)
    console.log("You are host now")
    console.log({...user
      ,userType:'Host',
      hostStatus:true,
      userProfile:(user?.userProfile)!=""?user?.userProfile:"img",
      userGovId:((user?.userGovId==""||user?.userGovId==null)?"nothing":user?.userGovId)})
    await actors.userActor?.updateUserInfo({...user
      ,userType:'Host',
      hostStatus:true,
      userProfile:(user?.userProfile)!=""?user?.userProfile:"img",
      userGovId:((user?.userGovId==""||user?.userGovId==null)?"nothing":user?.userGovId
      
      ),
      agreementStatus:user?.agreementStatus
    }).then(async(res)=>{
      console.log(res)
      
      setLoading(false)
      alert('You are a host now!')
      setCreateHotel(true)
      await actors.userActor?.getUserInfo().then((res)=>{
        console.log(res[0])
        dispatch(setUser(res[0]))
      }).then(()=>{
        getHotelList()
      }).catch((err)=>{
        setLoading(false)
        alert(err)
        console.log(err)
      })

    }).catch((err)=>{
      setLoading(false)
      alert(err)
      console.log(err)
    })
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Image source={images.profile2} style={styles.profileLogo}/>
        <Text style={styles.headerName}>{user?.firstName +" "+ user?.lastName}</Text>
        <Text style={styles.headerText}>{user?.userEmail}</Text>
        <Text style={styles.headerText}>{user?.dob}</Text>
      </View>
      <View style={styles.dataCont}>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon3 name='manage-accounts' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Host Status</Text>
          </View>
          <Text style={styles.valueText}>{user?.hostStatus?"Host":"User"}</Text>
        </View>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
            <Icon name='idcard' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Government ID</Text>
          </View>
          <Text style={styles.valueText}>{user?.userGovId?user?.userGovId:"Not Provided"}</Text>
        </View>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon3 name='verified' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Verified</Text>
          </View>
          <Text style={styles.valueText}>{user?.verificationStatus?"Yes":"No"}</Text>
        </View>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon2 name='user' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>User Type</Text>
          </View>
          <Text style={styles.valueText}>{user?.userType}</Text>
        </View>
        <ActivityIndicator size={40} animating={loading}/>
        
        <View style={styles.btnCont}>
          <TouchableOpacity style={styles.btn} onPress={()=>setEditProfile(true)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Launch')}>
            <Text style={styles.btnText}>Book</Text>
          </TouchableOpacity>
          </View>
        
        {
          (user?.userType!='Host')? 
          <TouchableOpacity style={styles.updateBtn} onPress={()=>{
            makeHost()
            
          }}>
            <Text style={styles.btnText}>Make me a host</Text>
          </TouchableOpacity> :
          
          <TouchableOpacity style={styles.updateBtn} onPress={()=>navigation.navigate('hostHome')}>
          <Text style={styles.btnText}>Switch to host View</Text>
        </TouchableOpacity>
          
       
        }
        
          
      </View>
      {/*Modals */}
      <Modal animationType='slide' visible={editProfile}>
        <UpdateProfile setEditProfile={setEditProfile} />
      </Modal>
      {/* <Modal animationType='slide' visible={(hostModal>0 && hostModal<=3)?true:false}>
        <HostWelcomeManager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>
      <Modal animationType='slide' visible={(hostModal>3 && hostModal<=8)?true:false}>
        <Step1Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>
      <Modal animationType='slide' visible={(hostModal>8 && hostModal<=16)?true:false}>
        <Step2Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>
      <Modal animationType='slide' visible={(hostModal>16 && hostModal<=23)?true:false}>
        <Step3Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal> */}
      <BottomNav navigation={navigation}/>
    </ScrollView>
  )
}

export default UserDetailDemo

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
      backgroundColor:COLORS.darkPurple,
      borderBottomRightRadius:20,
      borderBottomLeftRadius:20,
      height:'37%',
      width:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
    },
    title:{
        fontSize:SIZES.medium,
        color:'white',
        textAlign:'center',
        marginBottom:40,
        marginTop:18,
        fontWeight:'bold'
    },
    profileLogo:{
      height:110,
      width:110,
      borderRadius:75,
      borderColor:'white',
      borderWidth:2,
      marginBottom:10
    },
    headerName:{
      fontSize:SIZES.medium,
        color:'white',
        textAlign:'center',
        marginBottom:8,
    },
    headerText:{
      fontSize:SIZES.preMedium,
        color:'white',
        textAlign:'center',
        marginBottom:3,
        opacity:0.8
    },
    dataCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'80%'
    },
    dataRow:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      marginTop:32
    },
    propertyCont:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start'
    },
    propertyText:{
      fontSize:SIZES.preMedium,
      color:'black',
      fontWeight:'bold'
    },
    valueText:{
      fontSize:SIZES.preMedium,
      color:'black',
      opacity:0.6
    },
    btnCont:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      marginTop:20
    },
    btn:{
      width:'40%',
      borderRadius:10,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:COLORS.inputBorder,
      height:60,
      width:'40%',
    },
    updateBtn:{
      width:'80%',
      borderRadius:10,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:COLORS.inputBorder,
      height:60,
      width:'100%',
      marginTop:20
    },
    btnText:{
        fontSize:SIZES.medium,
        color:'white',
        fontWeight:'bold'
    }
})