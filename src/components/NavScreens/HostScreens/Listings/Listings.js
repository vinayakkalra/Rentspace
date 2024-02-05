import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native'
import React,{useState,useEffect} from 'react'
import BottomNavHost from '../../../Navigation/BottomNavHost'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../constants/themes'
import ListingCard from './ListingCard'
import { images } from '../../../../constants'
import { useSelector } from 'react-redux'
import Step1Manager from '../../../HostViewNew/Step1Manager'
import Step2Manager from '../../../HostViewNew/Step2Manager'
import Step3Manager from '../../../HostViewNew/Step3Manager'
import ChatDrawer from '../ChatPage/ChatDrawer/ChatDrawer'

const Listings = ({navigation}) => {
    const {hotels}=useSelector(state=>state.hotelsReducer)
    const {actors}=useSelector(state=>state.actorReducer)
    const [hotelList,setHotelList]=useState([])
    const [hostModal,setHostModal]=useState(0)
    const [newHotel,setNewHotel]=useState({})
    const [showDrawer,setShowDrawer]=useState(false)
    async function getHotelDetails(){
        setHotelList([])
        for(let i=0;i<hotels?.length;i++){
          await actors.hotelActor?.getHotel(hotels[i]).then((res)=>{
            setHotelList(hotelList=>[...hotelList,res[0]])
          })
        }
      }

    useEffect(()=>{
        getHotelDetails()
    },[hotels])
    const listings=[
        {
            name:'Taj Hotel',
            address:'Mumbai, Maharashtra',
            image:images.hotelImg1,
            status:2
        },
        {
            name:'Hotel Ramada',
            address:'Lucknow, UP',
            image:images.hotelImg2,
            status:0
        },
        {
            name:'Hotel Pennsylvania',
            address:'Pennsylvania, Austria',
            image:images.hotelImg3,
            status:1
        },
        {
            name:'Constantinople Inn',
            address:'Istanbul',
            image:images.hotelImg4,
            status:0
        },
        {
            name:'Jaypur Palace',
            address:'Jaypur, Rajasthan',
            image:images.hotelImg5,
            status:1
        },
    ]
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Your listings</Text>
        <View style={styles.iconCont}>
            <TouchableOpacity style={styles.icon}>
                <Icon name='collage' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>setHostModal(4)}>
                <Icon2 name='plus' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
        </View>
      </View>
      {
        (hotelList.length>0)?
            <FlatList style={styles.list} contentContainerStyle={{paddingBottom:80}} data={hotelList} renderItem={(item)=>(
                <ListingCard item={item.item}/>
            )}/>
        :
            <Text style={{color:'red',marginTop:50}}>Sorry! No listings to show</Text>    
      }
      
      <BottomNavHost navigation={navigation} setShowDrawer={setShowDrawer} showDrawer={showDrawer}/>
      <Modal animationType='fade' visible={showDrawer} transparent>
        <ChatDrawer navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
      </Modal>

        {/* 
            Hotel creation models
      */}
      <Modal animationType='slide' visible={(hostModal>3 && hostModal<=8)?true:false}>
        <Step1Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>
      <Modal animationType='slide' visible={(hostModal>8 && hostModal<=16)?true:false}>
        <Step2Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>
      <Modal animationType='slide' visible={(hostModal>16 && hostModal<=23)?true:false}>
        <Step3Manager hostModal={hostModal} setHostModal={setHostModal}/>
      </Modal>

    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        marginLeft:'2%',
        marginVertical:20
    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:75,
        marginTop:8
    },
    icon:{
        width:30
    },
    title:{
        fontSize:SIZES.medxLarge,
        color:'black',
        fontWeight:'500',
    },
    list:{
        paddingBottom:500,
        width:'100%',
        display:'flex',
        flexDirection:'column',
    }
})