import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = () => {

  const [location, setLocation] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.043,
    longitudeDelta: 0.041,
  });

  useEffect(()=>{
    Geolocation.getCurrentPosition((loc)=>{
      const coordinates=loc.coords
      setLocation({
        latitude:coordinates.latitude,
        longitude:coordinates.longitude,
        latitudeDelta:0.0421,
        longitudeDelta:0.0421
      })
    },(err)=>{console.log(err)}
  )
  },[])

  return (
    <View style={styles.mapCont}>
      <MapView style={styles.mapCont}
            // initialRegion={{
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // }}
            zoomEnabled={true}
            showsUserLocation={true}
            initialRegion={location}
      >
        <Marker 
          title='Current Location'
          description='Your current location'
          coordinate={location}/>
        </MapView>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    mapCont:{
      width:'100%',
      height:540
    }
})