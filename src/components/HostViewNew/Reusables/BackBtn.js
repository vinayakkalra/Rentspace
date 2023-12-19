import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../../constants/themes'

const BackBtn = ({setHostModal}) => {
  return (
    <>
      <TouchableOpacity style={styles.backIcon} onPress={()=>{setHostModal(0)}}>
        <Icon2 name="angle-left" size={30} color={COLORS.textLightGrey}/>    
      </TouchableOpacity>
    </>
  )
}

export default BackBtn

const styles = StyleSheet.create({
    backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        justifyContent:'flex-start',
        paddingLeft:30,
    },
})