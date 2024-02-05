import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Icon from'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Video from 'react-native-video'
import { images,reels } from '../../../../constants'
import SwiperFlatList from 'react-native-swiper-flatlist'



const ReelObject = () => {
    const videoList=[
        "https://storage.googleapis.com/rentspace/City%20Of%20Gold%20_%20Nirvair%20Pannu%20(Full%20Video)%20Deep%20Royce%20_%20Juke%20Dock.mp4-85c96ba9-0c41-4357-a7e5-afcbbbb45497.mp4",
        "https://storage.googleapis.com/rentspace/VID-20231213-WA0000.mp4-28945091-e871-4dc2-afc4-2dffe6517492.mp4"
    ]
  return (
    <SwiperFlatList 
        style={{flex:1}}
        data={videoList}
        renderItem={(item)=>(
            <View style={styles.reel}>
                <Video 
                    source={{uri:item?.item}} 
                    resizeMode="cover"
                    pause={false} 
                    style={styles.bg}
                    repeat={true}
                />
                {/* <Image source={images.reelBG} style={styles.bg}/>  */}
                <View style={styles.iconCont}>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name='hearto' color={'white'} size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon name='plus' color={'white'} size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Icon2 name='chatbubble-ellipses-outline' color={'white'} size={25}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bigIcon}>
                        <Icon3 name='film' color={'white'} size={22}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoCont}>
                    <Text style={styles.infoTitle}>Tarur, India</Text>
                    <Text style={styles.infoText}>499 kilometers away</Text>
                    <Text style={styles.infoText}>1-6 Dec</Text>
                    <Text style={styles.infoText}>
                        <Text style={{fontWeight:'bold'}}>
                            $ 25,106 
                        </Text>
                        {" "}
                        night
                    </Text>
                </View>
                </View>
        )}
        vertical={true}
        />    
    
  )
}

export default ReelObject

const styles = StyleSheet.create({
    reel:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:COLORS.darkPurple
    },
    iconCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        height:'32%',
        width:50,
        position:'absolute',
        bottom:'7%',
        right:'3%',
    },
    infoCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        position:'absolute',
        bottom:'10%',
        left:'8%',
        padding:5
    },
    infoTitle:{
        color:'white',
        fontSize:SIZES.large-1,
        fontWeight:'500',
        marginBottom:10
    },
    infoText:{
        color:'white',
        fontSize:SIZES.preMedium,
        fontWeight:'300',
        marginBottom:1
    },
    icon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40,
        borderRadius:30,
    },
    bigIcon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:45,
        height:45,
        borderRadius:30,
        backgroundColor:COLORS.hostTitle,
        marginVertical:15
    },
    bg:{
        width:'100%',
        height:'100%',
        // objectFit:'cover',
    }
})