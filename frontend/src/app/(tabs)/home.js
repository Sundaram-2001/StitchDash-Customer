import { Tabs } from "expo-router";
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { getDeviceLocality } from "../../../utils/location";
import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState("Loading Location....");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeHome = async () => {
      try {
        setLoading(true);
        const geopoint = await getDeviceLocality();
        setLocation(`${geopoint.locality}, ${geopoint.city}`);
      } catch (err) {
        console.error("Frontend error occured:", err);
        setLocation("Gachibowli, Hyderabad");
      } finally {
        setLoading(false);
      }
    };

    initializeHome();
  }, []); 

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#006d3d" />
        <Text style={styles.loadingText}>Configuring your home feed...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Tabs.Screen options={{ headerTitle: `Delivering to: ${location}` }} />
      
      {/* 🔍 Search Input Capsule */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for boutiques, tailors etc.."
          placeholderTextColor="#8a8a8e"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.quickServicesText}>Quick Services</Text>
      </View>

      {/* 🗺️ Service Menu List Grid */}
      <View style={styles.gridContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#e6f4ea" }]}>
            <Text style={styles.cardEmoji}>✂️</Text>
          </View>
          <Text style={styles.cardTitle}>Alterations</Text>
          <Text style={styles.cardSubtitle}>Resize & Repair</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#e8f0fe" }]}>
            <Text style={styles.cardEmoji}>👔</Text>
          </View>
          <Text style={styles.cardTitle}>Custom Stitching</Text>
          <Text style={styles.cardSubtitle}>Built from scratch</Text>
        </TouchableOpacity>

        
        <TouchableOpacity activeOpacity={0.7} style={styles.gridCard}>
          <View style={[styles.iconWrapper, { backgroundColor: "#fef7e0" }]}>
            <Text style={styles.cardEmoji}>✨</Text>
          </View>
          <Text style={styles.cardTitle}>Boutiques</Text>
          <Text style={styles.cardSubtitle}>Premium Outfits</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>How it works?</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollPadding}
      >
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>01</Text>
          <Text style={styles.stepTitle}>Book Service</Text>
          <Text style={styles.stepDescription}>Select the alteration or stitching type you need online.</Text>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>02</Text>
          <Text style={styles.stepTitle}>Doorstep Pickup</Text>
          <Text style={styles.stepDescription}>An agent collects your fabric or sample measurements garment.</Text>
        </View>
        <View style={styles.stepCard}>
          <Text style={styles.stepNumber}>03</Text>
          <Text style={styles.stepTitle}>Perfect Fit</Text>
          <Text style={styles.stepDescription}>Expert local tailors stitch it, and we deliver it right back.</Text>
        </View>
      </ScrollView>
      <View style={{ height: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
    paddingTop: 12, 
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", 
  },
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    marginTop: 28,  
    marginBottom: 14, 
  },
  sectionTitleText: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1f1f1f",
    letterSpacing: -0.3,
  },
  horizontalScrollPadding: {
    paddingHorizontal: 16,
    gap: 12, 
  },
  stepCard: {
    width: 210,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f1f3f4",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#e6f4ea", 
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1f1f1f",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 12,
    color: "#757575",
    lineHeight: 17,
  },
  loadingText: {
    marginTop: 14,
    color: "#757575",
    fontSize: 15,
    fontWeight: "500",
  },
  
  searchBarContainer: {
    backgroundColor: "#f1f3f4", 
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 24, 
    justifyContent: "center",
  },
  searchInput: {
    fontSize: 16,
    color: "#1f1f1f",
    width: "100%",
    fontWeight: "400",
  },
  
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    marginTop: 28,  
    marginBottom: 16, 
  },
  quickServicesText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f1f1f",
    letterSpacing: -0.3,
  },
  
  gridContainer: {
    paddingHorizontal: 16,
    gap: 12, 
  },
  gridCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f1f3f4",
    // Premium soft elevation shadows
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardEmoji: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f1f1f",
    flex: 1, 
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#757575",
    fontWeight: "400",
  }
});