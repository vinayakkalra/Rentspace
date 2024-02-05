import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Step3 from './Step3/Step3'
import FirstReservation from './Step3/FirstReservation/FirstReservation'
import Pricing from './Step3/Pricing/Pricing'
import Discount from './Step3/Discount/Discount'
import SecurityCheck from './Step3/SecurityCheck/SecurityCheck'
import ReviewListing from './Step3/ReviewListing/ReviewListing'
import Congratulations from './Step3/Congratulations/Congratulations'

const Step3Manager = ({hostModal,setHostModal}) => {
  let component="<></>"
  
  switch(hostModal){
    case(17):
        component=<Step3 setHostModal={setHostModal} pos={17}/>
        break
    case(18):
        component=<FirstReservation setHostModal={setHostModal} pos={18}/>
        break
    case(19):
        component=<Pricing setHostModal={setHostModal} pos={19}/>
        break   
    case(20):
        component=<Discount setHostModal={setHostModal} pos={20}/>
        break   
    case(21):
        component=<SecurityCheck setHostModal={setHostModal} pos={21}/>
        break   
    case(22):
        component=<ReviewListing setHostModal={setHostModal} pos={22}/>
        break
    case(23):
        component=<Congratulations setHostModal={setHostModal} pos={23}/>
        break       
    default:
        component=<Text style={{color:'black'}}>Component not created</Text>
  }

  return (
    <>
    {
        component
    }
    </>
  )
}

export default Step3Manager

const styles = StyleSheet.create({})