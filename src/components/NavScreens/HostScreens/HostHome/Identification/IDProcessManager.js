import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import KeyDetails from './KeyDetails/KeyDetails'
import About from './About/About'
import ChooseID from './ChooseID/ChooseID'

const IDProcessManager = ({idprocess,setIdprocess}) => {
    let component="<></>"
    
    switch(idprocess){
        case(1):
            component=<KeyDetails setIdprocess={setIdprocess} pos={1}/>
            break
        case(2):
            component=<About setIdprocess={setIdprocess} pos={2}/>
            break
        case(3):
            component=<ChooseID setIdprocess={setIdprocess} pos={3}/>
            break
        default:
            component=<Text style={{color:'black'}}>hello</Text>
    }
  return (
    <>
        {
            component
        }
    </>
  )
}

export default IDProcessManager

const styles = StyleSheet.create({})