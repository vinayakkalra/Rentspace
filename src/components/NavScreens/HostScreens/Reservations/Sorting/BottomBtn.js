import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../constants/themes'

const BottomBtn = ({setSorting}) => {
  return (
    <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={()=>setSorting(false)}>
            <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
      </View>
  )
}

export default BottomBtn

const styles = StyleSheet.create({
    btnView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white',
        elevation:15,
        width:'100%',
        paddingVertical:20,
        position:'absolute',
        bottom:0
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'90%',
        paddingVertical:15,
        backgroundColor:COLORS.hostTitle,
        borderRadius:10
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'white'
    }
})