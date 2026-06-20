import { Tabs } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { getDeviceLocality } from "../../../utils/location";
import { useEffect, useState } from "react"; 

export default function Home() {
  const [location, setLocation] = useState("📍 Loading Location..");
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const initializeHome = async () => {
      try {
        setLoading(true);
        const geopoint = await getDeviceLocality(); 
        setLocation(`${geopoint.locality}, ${geopoint.city}`); 
      } catch (err) {
        console.error("Frontend error occurred:", err);
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
    <ScrollView style={styles.masterContainer} showsVerticalScrollIndicator={false}>
      <Tabs.Screen options={{ headerTitle: `📍 Delivering to: ${location}` }} />
      
      
      <View style={styles.headerTextWrapper}>
        <Text style={styles.serifHeading}>
          Tailored for you.
        </Text>
      </View>

      
      <View style={styles.buttonListGroup}> 
        <TouchableOpacity activeOpacity={0.6} style={styles.menuButton}>
          <Text style={styles.buttonTitle}>ALTERATIONS</Text>
          <Text style={styles.buttonSubtitle}>Refine your existing fit</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={styles.menuButton}>
          <Text style={styles.buttonTitle}>CUSTOM STITCHING</Text>
          <Text style={styles.buttonSubtitle}>Made from scratch to measure</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} style={styles.menuButton}>
          <Text style={styles.buttonTitle}>BOUTIQUE</Text>
          <Text style={styles.buttonSubtitle}>Curated artisanal collections</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.featuredSection}>
        <Text style={styles.sectionLabel}>FEATURED CRAFT</Text>
        
        <View style={styles.artisanCard}>
          <View style={styles.artisanLeftRow}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }} 
              style={styles.avatarImage}
            />
            <View>
              <Text style={styles.artisanName}>Master Elias</Text>
              <Text style={styles.artisanRole}>Bespoke Specialist</Text>
            </View>
          </View>
          
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ 4.9</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  
  centerContainer: {
    flex: 1,                  
    justifyContent: "center",
    alignItems: "center",     
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 14,
    color: "#757575",
    fontSize: 15,
    fontWeight: "500",
  },
  headerTextWrapper: {
    paddingHorizontal: 24,
    marginTop: 56,
    marginBottom: 48,
  },
  serifHeading: {
    fontSize: 46,
    fontStyle: "italic",
    fontFamily: "serif", 
    color: "#0a0a0a",
    letterSpacing: -0.5,
  },
  buttonListGroup: {
    width: "100%",
    paddingHorizontal: 24,
  },
  menuButton: {
    width: "100%",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: "#f4f4f5",
    alignItems: "flex-start", 
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#09090b",
    letterSpacing: 1.8, 
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#a1a1aa", 
  },
  featuredSection: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 56,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#71717a",
    letterSpacing: 2,
    marginBottom: 16,
  },
  artisanCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f4f4f5",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  artisanLeftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f4f4f5",
    marginRight: 16,
  },
  artisanName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#09090b",
  },
  artisanRole: {
    fontSize: 13,
    color: "#71717a",
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f4f4f5",
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#27272a",
  },
  bottomSpacer: {
    height: 80,
  },
});