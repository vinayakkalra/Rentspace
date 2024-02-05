import { StyleSheet, Text, View,TouchableOpacity, FlatList,Modal, ActivityIndicator } from 'react-native'
import React,{useEffect, useState,useRef} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../../constants/themes'
import ChatCard from './ChatCard'
import BottomNavHost from '../../../../Navigation/BottomNavHost'
import Chat from '../ChatComponents/Chat'
import BottomNav from '../../../../Navigation/BottomNav'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setChatToken } from '../../../../../redux/chatToken/actions'
import { useRoute } from '@react-navigation/native'
import { Principal } from '@dfinity/principal'
import ChatDrawer from '../ChatDrawer/ChatDrawer'

const sampleChats=require('../../../HostScreens/ChatPage/AllChats/SampleChat.json')

const AllChats = ({navigation}) => {
    const [loading,setLoading]=useState(false)
    const [chats,setChats]=useState([])
    const [chatUsers,setChatUsers]=useState([])
    const [openChat,setOpenChat]=useState(false)
    const [chatItem,setChatItem]=useState({})
    const {actors}=useSelector(state=>state.actorReducer)
    const {authData}=useSelector(state=>state.authDataReducer)
    const [token,setToken]=useState('')
    const dispatch=useDispatch()
    const route=useRoute()
    const firstUpdate = useRef(true);
    const [showDrawer,setShowDrawer]=useState(false)
    // const {newChat}=route.params
    const baseUrl="https://rentspace.kaifoundry.com"
    const chatLogin=async()=>{
        setLoading(true)
        setChats([])
        console.log(`authData : ${authData}\n principal : ${authData.principal}\n publicKey : ${authData.publicKey}`)
        console.log({
            principal:authData.principal,
            publicKey:authData.publicKey
         })
         await axios.post(`${baseUrl}/api/v1/login/user`,{
            principal:authData.principal,
            publicKey:authData.publicKey
         }).then(async(res)=>{
            console.log("chat login resp : ",res.data.userToken)
            setToken(res.data.userToken)
            dispatch(setChatToken(res.data.userToken))
            await axios.post(`${baseUrl}/api/v1/chat/history`,{},{headers:{
                "x-principal":authData.principal,
                "x-private-token":res.data.userToken
            }}).then((resp)=>{
                console.log("history : ",resp.data)
                setChats(resp.data.historyUsers)
                console.log("before gett",chats)
                // getAllChatUser()
            }).catch((err)=>{
                console.log("history err :",err.response.data)
                setLoading(false)
            })

         }).catch((err)=>{
            console.log("chat login error : ",err.response.data)
            setLoading(false)
        })
    }
    const getAllChatUser=async()=>{
        console.log("using function : ",actors?.userActor?.getUserInfoByPrincipal)
        console.log("getting all users!")
        let fromPrinciples=[]
        let toPrinciples=[]
        chats.map((chat)=>{
            fromPrinciples.push(chat.fromPrincipal)
            console.log("from map : ",chat.fromPrincipal)
            
        })
        chats.map((chat)=>{
            if(!(fromPrinciples.includes(chat.toPrincipal))){
                console.log("to map : ",chat.toPrincipal)
                toPrinciples.push(chat.toPrincipal)
            }
        })
        console.log("fromPrinciples : ",fromPrinciples)
        console.log("toPrinciples : ",toPrinciples)
        fromPrinciples.concat(toPrinciples)
        fromPrinciples.map(async(chat,index)=>{
            console.log(`user ${index} : ${chat}`)
            
            await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(chat.toString()))
            .then((res)=>{
                console.log(res[0])
                setChatUsers([...chatUsers,{...res[0],id:chat}])
                setLoading(false)
            }).catch((err)=>{
                console.log("chatuser fetching err : ",err)
                setLoading(false)
            })
        })
        console.log(chatUsers)
        
        // if(newChat!="" && !(fromPrinciples.includes(newChat))){
        //     console.log(`new user : ${newChat}`)
        //     console.log("Creating new chat")
        //     await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(newChat))
        //     .then((res)=>{
        //         console.log(res[0])
        //         setChatUsers([...chatUsers,{...res[0],id:newChat}])
        //         setLoading(false)
        //     }).catch((err)=>{
        //         console.log("new chatuser fetching er : ",err)
        //         setLoading(false)
        //     })
        // }
        setLoading(false)
    }
    useEffect(()=>{
        chatLogin()
        setChatUsers([])
    },[])
    useEffect(()=>{
        
        if(firstUpdate.current){
            firstUpdate.current=false
        }else{
            getAllChatUser()
        }
    },[chats])

  if(chatUsers?.length>0){
        {
            return(
                <View style={styles.view}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Your Chats</Text>
                        <View style={styles.iconCont}>
                            <TouchableOpacity style={styles.icon} onPress={()=>console.log("newChat : ",newChat)}>
                                <Icon name='collage' size={30} color={COLORS.textLightGrey}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon}>
                                <Icon2 name='plus' size={30} color={COLORS.textLightGrey}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList style={styles.list} data={chatUsers} renderItem={(item)=>(
                        <ChatCard item={item?.item} setOpenChat={setOpenChat} openChat={openChat} setChat={setChatItem}/>
                )}/>
                    <BottomNavHost navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
                    <Modal animationType='slide' visible={openChat}>
                        <Chat item={chatItem} setOpenChat={setOpenChat}/>
                    </Modal>
                    <Modal animationType='fade' visible={showDrawer} transparent>
                        <ChatDrawer navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
                    </Modal>
                </View>
            )
        }

    }else{
        return(
            <View style={styles.view}>
                <View style={styles.header}>
                    <Text style={styles.title}>Your Chats</Text>
                    <View style={styles.iconCont}>
                        <TouchableOpacity style={styles.icon} onPress={()=>{console.log("newChat : ",newChat)}}>
                            <Icon name='collage' size={30} color={COLORS.textLightGrey}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon2 name='plus' size={30} color={COLORS.textLightGrey}/>
                        </TouchableOpacity>
                    </View> 
                </View>
                <View style={styles.nothingCont}>
                    <Text style={styles.nothingText}>
                        You don't have any chats yet!
                    </Text>
                </View>
                <BottomNavHost navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
                <ActivityIndicator size={40} animating={loading} style={styles.loader}/>
                <Modal animationType='fade' visible={showDrawer} transparent>
                    <ChatDrawer navigation={navigation} showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
                </Modal>
            </View>
        )
    }
}

export default AllChats

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        marginLeft:'2%',
        marginVertical:20
    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:75,
        marginTop:8
    },
    icon:{
        width:30
    },
    title:{
        fontSize:SIZES.medxLarge,
        color:'black',
        fontWeight:'500',
    },
    list:{
        paddingBottom:500,
        width:'100%',
        display:'flex',
        flexDirection:'column',
    },
    nothingCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:COLORS.lighterGrey,
        width:'90%',
        borderRadius:20,
        minHeight:220,
        height:'65%',
        paddingTop:70
    },
    nothingText:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        textAlign:'center',
        maxWidth:'70%',
        marginBottom:10,
        fontWeight:'400',
    },
    loader:{
        position:'absolute',
        top:'45%',
        left:'45%'
      }
})