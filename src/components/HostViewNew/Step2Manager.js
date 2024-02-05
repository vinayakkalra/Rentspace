import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Step2 from './Step2/Step2'
import HotelKeyWord2 from './Step2/HotelKeyWord2/HotelKeyWord2'
import AddPhotos from './Step2/AddPhotos/AddPhotos'
import ReorderPhotos from './Step2/ReorderPhotos/ReorderPhotos'
import UploadTemp from './Step2/UploadTemp'
import HotelTitle from './Step2/HotelTitle/HotelTitle'
import HotelTag from './Step2/HotelTag/HotelTag'
import HotelDesc from './Step2/HotelDesc/HotelDesc'

const Step2Manager = ({hostModal,setHostModal}) => {
    let component='<></>'

    switch(hostModal){
        case(9):
            component=<Step2 setHostModal={setHostModal} pos={9}/>
            break
        case(10):
            component=<HotelKeyWord2 setHostModal={setHostModal} pos={10}/>
            break
        case(11):
            component=<AddPhotos setHostModal={setHostModal} pos={11}/>
            break
        case(12):
            component=<UploadTemp setHostModal={setHostModal} pos={12}/>
            break
        case(13):
            component=<ReorderPhotos setHostModal={setHostModal} pos={13}/>
            break
        case(14):
            component=<HotelTitle setHostModal={setHostModal} pos={14}/>
            break
        case(15):
            component=<HotelTag setHostModal={setHostModal} pos={15}/>
            break
        case(16):
            component=<HotelDesc setHostModal={setHostModal} pos={16}/>
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

export default Step2Manager

const styles = StyleSheet.create({})
