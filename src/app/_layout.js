import { Stack } from "expo-router";
import { useCallback } from "react";
//import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const Layout=()=>{

    


    const onLayoutRootView=useCallback(async()=>{
        
            setTimeout(async()=>{
                await SplashScreen.hideAsync()
            },3000)
            
            //console.log(fontsLoaded)
        
        
    },[])

    //if(!fontsLoaded) return null;
  
    return <Stack onLayout={onLayoutRootView} />
}
export default Layout