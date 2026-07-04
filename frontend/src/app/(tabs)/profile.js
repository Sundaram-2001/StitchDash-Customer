import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Tabs } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../lib/tokenExtract";
import { supabase } from "../../lib/supabase";

const signOut=async()=>{
    await supabase.auth.signOut()
}
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

const SETTINGS_ITEMS = [
    { key: "account", label: "Account", icon: "person-outline" },
    { key: "notifications", label: "Notifications", icon: "notifications-outline" },
    { key: "help", label: "Help", icon: "help-circle-outline" },
];

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
            <ActivityIndicator size="large" color="#18181b" />
        </View>
        ) : error ? (
        <View style={styles.center}>
            <Text style={styles.errorText}>{error.message || "Failed to load profile."}</Text>
        </View>
        ) : (
        <View style={styles.childContainer}>
            <View style={styles.headerSection}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {(profile?.name || "U").charAt(0).toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.welcomeText}>{profile?.name || "User"}</Text>
                <Text style={styles.infoText}>{profile?.email}</Text>

                <Pressable style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </Pressable>
            </View>

            <View style={styles.panel}>
                {SETTINGS_ITEMS.map((item, index) => (
                    <Pressable
                        key={item.key}
                        style={[
                            styles.row,
                            index !== SETTINGS_ITEMS.length - 1 && styles.rowBorder,
                        ]}
                    >
                        <Ionicons name={item.icon} size={20} color="#52525b" />
                        <Text style={styles.rowLabel}>{item.label}</Text>
                        <Ionicons name="chevron-forward" size={18} color="#a1a1aa" />
                    </Pressable>
                ))}
            </View>

            <Pressable
                style={styles.logoutButton}
                onPress={async () => {
                    signOut()
                }}
            >
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    },
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    },
    headerSection: {
    alignItems: "center",
    marginBottom: 32,
    },
    avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#f4f4f5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    },
    avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a1a1aa",
    },
    welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#18181b",
    },
    infoText: {
    fontSize: 14,
    color: "#52525b",
    marginTop: 4,
    },
    editButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#18181b",
    },
    editButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    },
    panel: {
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
    overflow: "hidden",
    },
    row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    },
    rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    },
    rowLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#27272a",
    },
    logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#f4f4f5",
    },
    logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    },
    errorText: {
    color: "#ef4444",
    fontSize: 15,
    },
});
