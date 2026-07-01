import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import {View, Text, StyleSheet, ActivityIndicator} from "react-native"
import {getDeviceLocality} from "../../../../utils/location"
import { useSafeAreaFrame } from "react-native-safe-area-context"
export default function Home(){
    const [location,setLocation]=useState("📍 Loading Location..")
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const initializeHome=async()=>{
            try {
                setLoading(true)
                const geoPoint=await getDeviceLocality()
                setLocation(` ${geoPoint.locality}, ${geoPoint.city}`)
            } catch (error) {
                console.error("Something went wrong",error)
                setLocation("Unable to set location, contact support team")
            }
            finally{
                setLoading(false)
            }
        }
        initializeHome()
    },[])
    if(loading){
        return(
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#006d3d"/>
                <Text style={styles.loadingText}>Page loading, please wait..</Text>
            </View>
        )
    }
    return(
        <View style={styles.masterContainer}>
            <Stack.Screen
                options={{
                    headerTitle:`📍 Delivering to:${location}`
                }}
            />
            <View style={styles.contentWrapper}>
                <Text style={styles.headingText}>What are you looking for today?</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    centerContainer: {
    flex: 1,                  
    justifyContent: "center",
    alignItems: "center",     
    backgroundColor: "#ffffff",
    },
    loadingText:{
        marginTop: 14,
        color: "#757575",
        fontSize: 15,
        fontWeight: "500",
    },
    masterContainer:{
        flex: 1,
        backgroundColor: "#ffffff",
    },
        contentWrapper: {
            paddingHorizontal: 24,
            marginTop: 28, 
            alignItems: "flex-start", 
    },
    centerText:{
        fontSize: 24,
        fontWeight: "600",
        color: "#09090b",
        letterSpacing: -0.5,
    },
    headingText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#09090b",
        letterSpacing: -0.5,
        lineHeight: 32,
    }
})