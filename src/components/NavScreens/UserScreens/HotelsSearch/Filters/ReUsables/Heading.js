import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const Heading = ({text}) => {
  return (

      <Text style={styles.text}>{text}</Text>
  )
}

export default Heading

const styles = StyleSheet.create({
    text:{
        color:COLORS.black,
        fontWeight:'700',
        fontSize:SIZES.large+1
    }
})