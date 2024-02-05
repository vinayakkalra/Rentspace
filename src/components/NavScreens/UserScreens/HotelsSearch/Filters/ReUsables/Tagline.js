import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const Tagline = ({text}) => {
  return (
      <Text style={styles.text}>{text}</Text>
  )
}

export default Tagline

const styles = StyleSheet.create({
    text:{
        color:COLORS.black,
        fontSize:SIZES.preMedium-1,
        fontWeight:'500',
        marginVertical:7
    }
})