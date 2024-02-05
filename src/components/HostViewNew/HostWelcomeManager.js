import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HostFirstScreen from './HostFirstScreen/HostFirstScreen'
import HostWelcomeBack from './HostWelcomeBack/HostWelcomeBack'
import HostGettingStarted from './HostGettingStarted/HostGettingStarted'

const HostWelcomeManager = ({hostModal,setHostModal,navigation}) => {

    let component='<></>'
    switch(hostModal){
        case(1):
        component=<HostFirstScreen setHostModal={setHostModal} navigation={navigation}/>
        break

        case(2):
        component=<HostWelcomeBack setHostModal={setHostModal} navigation={navigation}/>
        break

        case(3):
        component=<HostGettingStarted setHostModal={setHostModal} navigation={navigation}/>
        break
    }
  return (
    <>
      {
        component
      }
    </>
  )
}

export default HostWelcomeManager

const styles = StyleSheet.create({})