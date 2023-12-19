import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import  {  useState } from 'react'
import { SIZES,COLORS } from '../../constants/themes'
import Icon from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import { useSelector,useDispatch } from 'react-redux'
import { setHotels } from '../../redux/hotels/actions'

const HotelCreationForm = ({setHotelCreateForm}) => {
  const {user}=useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false)
  const [hotelData,setHotelData]=useState({})
  const createHotel=async()=>{
    console.log('create hotel')
    setLoading(true)
  await actors.hotelActor?.createHotel(hotelData).then(async(res)=>{
    setLoading(false)
    alert('Your hotel has been created')
   
    await actors.hotelActor?.getHotelId().then(async(res)=>{
      console.log(res)
      dispatch(setHotels(res))
      setHotelCreateForm(false)
     
    })

  }).catch((err)=>{console.log(err)})
  }
  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.title}>Create new Hotel</Text>
      <View style={styles.labelCont}>
      <Icon3 name='hotel' size={15} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Hotel Name</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelTitle}
        placeholder='Hotel Name'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelTitle:value})}}
      />
      <View style={styles.labelCont}>
      <Icon2 name='notebook-outline' size={18} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Description</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelDes}
        placeholder='Hotel description'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelDes:value})}}
      />
      <View style={styles.labelCont}>
      <Icon name='photograph' size={15} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Image</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelImage}
        placeholder='Hotel Image'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelImage:value})}}
      />
      <View style={styles.labelCont}>
      <Icon4 name='attach-money' size={18} color={'black'} style={{marginRight:3}}/>
        <Text style={styles.simpleText}>Price per night</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelPrice}
        placeholder='Price per night'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelPrice:value})}}
      />
      <View style={styles.labelCont}>
      <Icon4 name='location-on' size={18} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Location</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        value={hotelData?.hotelLocation}
        placeholder='Location'
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setHotelData({...hotelData,hotelLocation:value})}}
      />
      <ActivityIndicator size={40} animating={loading}/>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{createHotel()}}>
        <Text style={styles.submitText}>Create Hotel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{setHotelCreateForm(false)}}>
        <Text style={styles.submitText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HotelCreationForm

const styles = StyleSheet.create({
  bottomSheet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    paddingVertical:40
  },
  title:{
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'black',
    marginBottom:40
  },
  inputs:{
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.inputBorder,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  submitBtn:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 80,
    marginTop: 10,
  },
  submitText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  labelCont:{
    display:'flex',
    flexDirection:'row',
    marginBottom:4,
    width:'80%',
    justifyContent:'flex-start',
    alignContent:'center'
  },
  simpleText:{
    fontSize:SIZES.preMedium,
    color:'black',

  },
})