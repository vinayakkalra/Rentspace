import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Step1 from './Step1/Step1'
import HotelKeyWord from './Step1/HotelKeyWord/HotelKeyWord'
import HotelType from './Step1/HotelType/HotelType'
import HotelLocation from './Step1/HotelLocation.js/HotelLocation'
import BasicDetails from './Step1/BasicDetails.js/BasicDetails'

const Step1Manager = ({hostModal,setHostModal}) => {

    let component='<></>'
    switch(hostModal){
        case(4):
            component=<Step1 setHostModal={setHostModal} pos={4}/>
            break
        case(5):
            component=<HotelKeyWord setHostModal={setHostModal} pos={5}/>
            break
        case(6):
            component=<HotelType setHostModal={setHostModal} pos={6}/>
            break
        case(7):
            component=<HotelLocation setHostModal={setHostModal} pos={7}/>
            break
        case(8):
            component=<BasicDetails setHostModal={setHostModal} pos={8}/>
            break
        default:
            component=<Text style={{color:'black'}}>Component not created yet</Text>
    }
  return (
    <>
        {
            component
        }
    </>
  )
}

export default Step1Manager

const styles = StyleSheet.create({})