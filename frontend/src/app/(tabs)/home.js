import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { getDeviceLocality } from "../../../utils/location";

export default function Home() {
  const [locationName, setLocationName] = useState("Loading location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeHomeFeed = async () => {
      try {
        setLoading(true);
        const geoPoint = await getDeviceLocality(); 
        setLocationName(`${geoPoint.locality}, ${geoPoint.city}`);
      } catch (err) {
        console.error("Frontend Location Error:", err);
        setLocationName("Gachibowli, Hyderabad");
      } finally {
        setLoading(false);
      }
    };

    initializeHomeFeed();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#006d3d" />
        <Text style={styles.loadingText}>Fetching location coordinates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.centerContainer}>
      <Tabs.Screen options={{ headerTitle: `Delivering to: ${locationName}` }} />

      
      <Text style={styles.mainText}>This is home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9ff",
  },
  loadingText: {
    marginTop: 12,
    color: "#4c4546",
    fontSize: 14,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#151c27",
  },
});