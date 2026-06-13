import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
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
    <View style={styles.container}>
      <Tabs.Screen options={{ headerTitle: `Delivering to: ${locationName}` }} />

      <Text style={styles.mainText}>Hello, what are you looking for today?</Text>
      
      <View style={styles.listContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
          <Text style={styles.itemEmoji}>✂️</Text>
          <Text style={styles.itemText}>Alteration & Fitting</Text>
        </TouchableOpacity>

        
        <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
          <Text style={styles.itemEmoji}>👔</Text>
          <Text style={styles.itemText}>Custom Stitching</Text>
        </TouchableOpacity>

        
        <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
          <Text style={styles.itemEmoji}>✨</Text>
          <Text style={styles.itemText}>Festive & Wedding Wear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9ff",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
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
    fontSize: 20,
    fontWeight: "700",
    color: "#151c27",
    marginBottom: 24,
  },
  listContainer: {
    gap: 16, 
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f8",
    // Subtle shadow layout for iOS & Android
    shadowColor: "#151c27",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemEmoji: {
    fontSize: 22,
    marginRight: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#151c27",
  },
});