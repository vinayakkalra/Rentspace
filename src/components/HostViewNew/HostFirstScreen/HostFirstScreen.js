import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from './Header'
import BackBtn from '../Reusables/BackBtn'
import SearchMap from './SearchMap'
import ComparisonFeatures from './ComparisonFeatures/ComparisonFeatures'
import Questions from './Q&A/Questions'
import { COLORS } from '../../../constants/themes'

const HostFirstScreen = ({setHostModal}) => {
  return (
        <ScrollView contentContainerStyle={styles.view}>
            <BackBtn setHostModal={setHostModal}/>
            <Header/>
            <SearchMap/>
            <ComparisonFeatures/>
            <Questions/>
            <View style={styles.footer}>
                <View style={styles.footerEnv}>
                    <TouchableOpacity>
                        <Text style={styles.text}>Ready to Rentspace it?</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>    
  )
}

export default HostFirstScreen

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
    },
    footer:{
        width:'100%',
        height:100,
        backgroundColor:COLORS.bgLightGrey
    },
    footerEnv:{
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%',
        elevation:5
    },
    text:{
        color:COLORS.textLightGrey,
        textAlign:'center',
        opacity:0.8,
        fontWeight:'bold',
        marginTop:10
    }
})