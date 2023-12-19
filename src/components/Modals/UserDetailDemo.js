import { ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity, View, Modal } from 'react-native'
import  { useState } from 'react'
import { COLORS, SIZES } from '../../constants/themes'
import { User } from '../../declarations/User/index.js'
import {hotel} from '../../declarations/hotel/index.js'
import { images } from '../../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { useSelector,useDispatch } from 'react-redux'
import { setUser,setHotels } from '../../redux/users/actions'
import HostFirstScreen from '../HostViewNew/HostFirstScreen/HostFirstScreen'

const UserDetailDemo = ({setUpdatePage,self,setHotelCreateForm}) => {

  const {user}=useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const [hostModal,setHostModal]=useState(0)
  const dispatch=useDispatch()

  const [loading,setLoading]=useState(false)
  const makeHost=async()=>{
    setLoading(true)
    console.log("You are host now")
    await actors.userActor?.updateUserInfo({...user,userType:'Host',hostStatus:true}).then(async(res)=>{
      setLoading(false)
      alert('You are a host now!')

      self(false)
      setHotelCreateForm(true)
      await actors.userActor?.getUserInfo().then((res)=>{
        console.log(res[0])
        dispatch(setUser(res[0]))
      }).then(()=>{
        hotel.getHotelId().then((res)=>{
          console.log(res)
          dispatch(setHotels(res))
        })
      })

    }).catch((err)=>{console.log(err)})
  }

  return (

    <View style={styles.container}>
      <Modal visible={(hostModal==1?true:false)}>
        <HostFirstScreen setHostModal={setHostModal}/>
          </Modal>
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
          
        <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText} onPress={()=>{self(false)}}>Book Hotel</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setUpdatePage(true)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          
        </View>
        {
          (user?.userType!='Host')? 
          <TouchableOpacity style={styles.updateBtn} onPress={()=>{
            makeHost()
            
          }}>
            <Text style={styles.btnText}>Make me a Host</Text>
          </TouchableOpacity> :
          <View style={styles.btnCont}>
          <TouchableOpacity style={styles.updateBtn} onPress={()=>{
            setHotelCreateForm(true)
          }}>
            <Text style={styles.btnText}>Create new Hotel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setHostModal(1)}>
          <Text style={styles.btnText}>Preview</Text>
        </TouchableOpacity>
          
        </View>
        }
        
          
      </View>
    </View>
  )
}

export default UserDetailDemo

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%'
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