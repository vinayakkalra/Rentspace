import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLORS, SIZES } from '../../../constants/themes'


const ListingOption = ({type,action}) => {
  return (
    <TouchableOpacity style={styles.optionCont} onPress={()=>{action()}}>
      <View style={styles.iconCont}>
        {
            type=='newListing'?
            <>
                <Icon name='add-home-work' size={30} color={COLORS.textLightGrey}/>
                <Text style={styles.text}>Create a new listing</Text>
            </>
            :
            <>
                <Icon name='copy-all' size={30} color={COLORS.textLightGrey}/>
                <Text style={styles.text}>Duplicate an existing listing</Text>
            </>
             
        }
       
        
      </View>
      <Icon name='arrow-forward-ios' size={20} color={COLORS.textLightGrey}/>
    </TouchableOpacity>
  )
}

export default ListingOption

const styles = StyleSheet.create({
    optionCont:{
        width:'90%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15,
    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'65%',
        alignItems:'center'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        opacity:0.8,
        marginLeft:'5%'
    }
})