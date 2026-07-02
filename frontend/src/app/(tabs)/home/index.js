import { Stack, router } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Image } from "react-native"
import { getDeviceLocality } from "../../../../utils/location"

export default function Home(){
    const [location, setLocation] = useState("📍 Locating You..")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initializeHome = async () => {
            try {
                setLoading(true)
                const geoPoint = await getDeviceLocality()
                setLocation(` ${geoPoint.locality}, ${geoPoint.city}`)
            } catch (error) {
                console.error("Something went wrong", error)
                setLocation("Unable to set location, contact support team")
            } finally {
                setLoading(false)
            }
        }
        initializeHome()
    }, [])

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#006d3d"/>
                <Text style={styles.loadingText}>Page loading, please wait..</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.masterContainer} showsVerticalScrollIndicator={false}>
            <Stack.Screen
                options={{
                    headerTitle: `📍 Delivering to:${location}`
                }}
            />
            
            
            <View style={styles.contentWrapper}>
                <Text style={styles.headingText}>What are you looking for today?</Text>
            </View>

            
            <View style={styles.iconActionRow}>
                <TouchableOpacity activeOpacity={0.7} style={styles.iconChipButton}>
                    <Text style={styles.chipEmoji}>✂️</Text>
                    <Text style={styles.chipLabel}>Alterations</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.iconChipButton}>
                    <Text style={styles.chipEmoji}>🧵</Text>
                    <Text style={styles.chipLabel}>Stitching</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={styles.iconChipButton}
                    onPress={() => router.push("/home/boutiques")}
                >
                    <Text style={styles.chipEmoji}>🛍️</Text>
                    <Text style={styles.chipLabel}>Boutiques</Text>
                </TouchableOpacity>
            </View>

            
            <View style={styles.boutiqueSectionWrapper}>
                <Text style={styles.sectionTitleText}>Top Boutiques near you</Text>
                
                
                <View style={styles.verticalCardList}>
                    
                    
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.boutiqueCard}
                        onPress={() => router.push("/home/boutiques")}
                    >
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80' }} 
                            style={styles.cardCoverImage}
                        />
                        <View style={styles.cardMetaBox}>
                            <Text style={styles.boutiqueNameText}>Nouveau Threads</Text>
                            <Text style={styles.boutiqueDistanceText}>Custom Bridal & Suits • 1.2 km</Text>
                        </View>
                    </TouchableOpacity>

                    
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.boutiqueCard}
                        onPress={() => router.push("/home/boutiques")}
                    >
                        <Image 
                            source={{ uri: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80' }} 
                            style={styles.cardCoverImage}
                        />
                        <View style={styles.cardMetaBox}>
                            <Text style={styles.boutiqueNameText}>Heritage Artisans</Text>
                            <Text style={styles.boutiqueDistanceText}>Ethnic & Handlooms • 2.5 km</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.bottomSpacer} />
        </ScrollView>
    )
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
    contentWrapper: {
        paddingHorizontal: 24,
        marginTop: 28, 
        alignItems: "flex-start", 
    },
    headingText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#09090b",
        letterSpacing: -0.5,
        lineHeight: 32,
    },
    iconActionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginTop: 24, 
    },
    iconChipButton: {
        width: "30%", 
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#f4f4f5",
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: "center", 
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
    },
    chipEmoji: {
        fontSize: 26, 
        marginBottom: 8,
    },
    chipLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#09090b",
        letterSpacing: -0.2,
    },
    boutiqueSectionWrapper: {
        marginTop: 36,
        width: "100%",
    },
    sectionTitleText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#71717a",
        letterSpacing: 1.2,
        textTransform: "uppercase",
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    verticalCardList: {
        paddingHorizontal: 24,
        flexDirection: "column",
        gap: 16, 
    },
    boutiqueCard: {
        width: "100%", 
        backgroundColor: "#ffffff",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#f4f4f5",
        overflow: "hidden", 
    },
    cardCoverImage: {
        width: "100%",
        height: 150, 
        backgroundColor: "#e4e4e7",
    },
    cardMetaBox: {
        padding: 14,
    },
    boutiqueNameText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#09090b",
        marginBottom: 2,
    },
    boutiqueDistanceText: {
        fontSize: 13,
        color: "#71717a",
    },
    bottomSpacer: {
        height: 80,
    }
})