import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constants/themes'
import Line from '../../../HostViewNew/Reusables/Line'
import MenuItem from './MenuItem'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { setActor } from '../../../../redux/actor/actions'
import { backend } from '../../../../declarations/backend'
import { User } from '../../../../declarations/User'
import { hotel } from '../../../../declarations/hotel'
import { setUser } from '../../../../redux/users/actions'
import { setHotels } from '../../../../redux/hotels/actions'
import { setPrinciple } from '../../../../redux/principle/actions'

const MenuPage = ({navigation}) => {
    const hostingItems=[
        {
            title:'Reservations',
            icon:<Icon3 name='bag-check-outline' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{navigation.navigate('hostHome')}
        },
        {
            title:'Earnings',
            icon:<Icon3 name='cash-outline' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:'Insights',
            icon:<Icon name='linechart' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:'Guidebooks',
            icon:<Icon name='book' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:'Create a new listing',
            icon:<Icon5 name='home-plus-outline' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        }
    ]
    const accountItems=[
        {
            title:"Profile",
            icon:<Icon name='user' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Settings",
            icon:<Icon name='setting' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Visit the help center",
            icon:<Icon name='questioncircleo' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Get help with a safety issue",
            icon:<Icon2 name='clipboard' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Explore hosting resources",
            icon:<Icon3 name='document-text-outline' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Contact with Hosts near you",
            icon:<Icon4 name='groups' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Give us feedback",
            icon:<Icon name='edit' size={23} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
        {
            title:"Refer a Host",
            icon:<Icon4 name='group' size={25} color={COLORS.textLightGrey}/>,
            onClick:()=>{}
        },
    ]
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(setActor({
            backendActor:backend,
            userActor:User,
            hotelActor:hotel
        }))
        dispatch(setUser({}))
        dispatch(setHotels([]))
        dispatch(setPrinciple(''))
        navigation.navigate('Launch')
    }

  return (
    <ScrollView contentContainerStyle={styles.view}>
      <Text style={styles.title}>Menu</Text>
      <Text style={styles.Btext}>Get Early Access</Text>
      <Text style={styles.subtitle}>Hosting</Text> 
      {
        hostingItems.map((item,index)=>(
            <MenuItem item={item} key={index}/>
        ))
      }
      <View style={styles.line} />
      <Text style={styles.subtitle}>Account</Text>  
      {
        accountItems.map((item,index)=>(
            <MenuItem item={item} key={index}/>
        ))
      }
      <TouchableOpacity style={[styles.btn,{marginTop:25}]} onPress={()=>navigation.navigate('Launch')}>
        <Text style={[styles.btnText,{color:COLORS.black}]}>Switch to travelling</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn,{backgroundColor:COLORS.hostTitle}]} onPress={logout}>
        <Text style={[styles.btnText,{color:'white'}]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default MenuPage

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        paddingVertical:30
    },
    title:{
        fontSize:SIZES.medxLarge,
        color:'black',
        fontWeight:'500',
        marginLeft:'7.5%'
    },
    Btext:{
        fontSize:SIZES.medium,
        color:'black',
        fontWeight:'800',
        marginLeft:'7.5%',
        marginVertical:20
    },
    subtitle:{
        fontSize:SIZES.large,
        color:COLORS.textLightGrey,
        fontWeight:'500',
        marginLeft:'7.5%'
    },
    line:{
        height:1,
        backgroundColor:COLORS.textLightGrey,
        opacity:0.1,
        width:'100%',
        marginVertical:20
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        marginLeft:'5%',
        borderRadius:12,
        paddingVertical:16,
        borderColor:COLORS.hostTitle,
        borderWidth:1,
        marginTop:10
    },
    btnText:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold'
    }
})