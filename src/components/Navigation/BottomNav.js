import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { COLORS ,SIZES} from '../../constants/themes'
import {images} from '../../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Fontisto'



const BottomNav = ({filterNav,searchNav,heartNav,commentNav,userNav}) => {


  return (
    
    
    <View style={styles.viewNav}>
        {/* <Icon name="home" size={20} color={COLORS.inputBorder}/> */}
        <TouchableOpacity style={styles.iconNav} onPress={()=>{filterNav()}}>
        <Icon name="filter" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{searchNav()}}>
            {/* <Image source={images.search}/> */}
            <Icon name="search1" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{heartNav(true)}}>
        <Icon name="hearto" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNav} onPress={()=>{commentNav()}}>
        <Icon2 name="comment" size={20} color={COLORS.inputBorder}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNav} onPress={()=>{userNav()}}>
        <Icon name="user" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity>
    </View>
      

    
  )
}
const styles=StyleSheet.create({
    profileCont:{
        display:'flex',
        flexDirection:'column',
        width:25,
        height:25,
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    },
    iconNav:{
        display:'inline',
        width:25,
        height:25
    },
    viewNav:{
        backgroundColor:"white",
        width:"100%",
        display:'flex',
        justifyContent:"space-around",
        position:"absolute",
        bottom:0,
        paddingVertical:20,
        flexDirection:"row",
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        elevation:15,
        shadowColor:'black',
        shadowOffset:{width:-2,height:4},
        shadowRadius:3
    },
    text:{
        textAlign:"center",
        color:"blue"
    }
})

export default BottomNav