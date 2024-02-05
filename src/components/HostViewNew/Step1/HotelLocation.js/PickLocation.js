import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon3 from 'react-native-vector-icons/FontAwesome6'

const PickLocation = ({setShowLocationPicker,coords,setCoords,setLocation,location}) => {
    const [searchText,setSearchText]=useState("")
    const pickCurrentLocation=()=>{
        Geolocation.getCurrentPosition((loc)=>{
            const coordinates=loc.coords
            setLocation(`${coordinates.longitude}#${coordinates.latitude}`)
            console.log(location)
            setCoords({
              latitude:coordinates.latitude,
              longitude:coordinates.longitude,
              latitudeDelta:0.0421,
              longitudeDelta:0.0421
            })
            console.log(coords)
          },(err)=>{console.log(err)}
        )
    }
    const onMapPress = (event) => {
        const pressedCoords = event.nativeEvent.coordinate;
        // Do something with pressedCoords, for example, update state
        setLocation(`${pressedCoords.longitude}#${pressedCoords.latitude}`)
        console.log(location)
        setCoords({
          latitude: pressedCoords.latitude,
          longitude: pressedCoords.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        console.log("Pressed Coordinates:", pressedCoords);
      };
    // const onLocationSelect = (event: ) => {
    //     console.log(event.nativeEvent.coordinate);
    //   }
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon} onPress={()=>setShowLocationPicker(false)}>
            <Icon name='close' color={COLORS.black} size={20}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Enter your address</Text>
      </View>
      <View style={styles.searchBar}>
      <Icon2 name='location' size={20} color={COLORS.textLightGrey} style={styles.icon}/>
      <TextInput 
        value={searchText} 
        placeholder='search your area' 
        placeholderTextColor={COLORS.textLightGrey}
        onChangeText={value=>setSearchText(value)}
        style={styles.inputText}
        />
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={pickCurrentLocation}>
        <Icon3 name='location-arrow' color={COLORS.textLightGrey} size={15}/>
        <Text style={styles.chooseLocation}>Use my current location</Text>
      </TouchableOpacity>  
      <View style={styles.mapCont}>
        <MapView style={styles.map}
            zoomEnabled={true}
            scrollEnabled={true}
            region={coords}
            showsUserLocation={true}
            onPress={onMapPress}
            >
        <Marker 
          coordinate={coords}>

          </Marker>
          </MapView>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>setShowLocationPicker(false)}>
        <Text style={styles.btnText}>Looks Good</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PickLocation

const styles = StyleSheet.create({
    view:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'94%',
        position:'absolute',
        top:'6%',
        backgroundColor:'white',
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        elevation:10
    },
    header:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        marginTop:15
    },
    headerText:{
        color:'black',
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    },
    closeIcon:{
        position:'absolute',
        left:'3%',
        top:'2%'
    },
    searchBar:{
        borderColor:COLORS.mediumGrey,
        borderWidth:1,
        display:'flex',
        width:'85%',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical:15,
        alignItems:'center',
        borderRadius:40,
        height:45
    },
    icon:{
        marginLeft:15,
        marginRight:10
    },
    inputText:{
        fontSize:SIZES.small,
        fontWeight:'bold',
        color:COLORS.textLightGrey,
        opacity:0.4,
        width:'70%'
    },
    mapCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        height:450,
        borderRadius:12,
        backgroundColor:'white',
        elevation:10
    },
    map:{
        width:'95%',
        height:'95%',
    },
    chooseLocation:{    
        fontWeight:'600',
        color:COLORS.textLightGrey,
        textAlign:'left',
        textDecorationLine:'underline',
        fontSize:SIZES.preMedium-1,
        marginLeft:5
    },
    locationButton:{
        width:'85%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        marginBottom:30
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        paddingVertical:12,
        borderRadius:12,
        backgroundColor:COLORS.hostTitle,
        marginTop:15
    },
    btnText:{
        color:'white',
        fontSize:SIZES.medium,
        fontWeight:'bold'
    }
})