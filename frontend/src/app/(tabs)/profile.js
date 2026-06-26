import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Tabs } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../lib/tokenExtract";


const fetchProfile = async () => {
    const token=await getToken()
    try {
    const response = await fetch("https://frisbee-sprung-charbroil.ngrok-free.dev/profile",{
        method:"GET",
        headers:{
            "Content_Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        throw new Error("Unexpected Server Error");
    }
    return await response.json();
    } catch (error) {
    console.error("failing at catch block:", error);
    throw error; 
    }
};

export default function ProfileScreen() {
    const { data: profile, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
    });

    return (
    <View style={styles.mainContainer}>
        <Tabs.Screen
        options={{
            headerTitle: "👤 Profile",
            headerStyle: { backgroundColor: "#ffffff" },
            headerShadowVisible: false,
        }}
        />

        {isLoading ? (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#208450" />
        </View>
        ) : error ? (
        <View style={styles.center}>
            <Text style={styles.errorText}>{error.message || "Failed to load profile."}</Text>
        </View>
        ) : (
        <View style={styles.childContainer}>
            <Text style={styles.welcomeText}>Welcome back, {profile?.name || "User"}!</Text>
            <Text style={styles.infoText}>Email: {profile?.email}</Text>
        </View>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    },
    childContainer: {
    flex: 1,
    padding: 24,
    },
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    },
    welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#09090b",
    },
    infoText: {
    fontSize: 16,
    color: "#71717a",
    marginTop: 8,
    },
    errorText: {
    color: "#ef4444",
    fontSize: 15,
    },
});