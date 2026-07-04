import { useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable, Alert } from "react-native";

const MOCK_TAILORS = [
    {
        id: "1",
        tailorName: "Rajesh Kumar",
        serviceName: "Trouser Hemming",
        price: 249,
        rating: "4.8",
        distance: "0.6 mi",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "2",
        tailorName: "Meera Textiles",
        serviceName: "Suit Jacket Resizing",
        price: 599,
        rating: "4.9",
        distance: "1.2 mi",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
        id: "3",
        tailorName: "Arjun Stitch Studio",
        serviceName: "Dress Alteration",
        price: 399,
        rating: "4.7",
        distance: "2.1 mi",
        image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=200&q=80"
    }
];

export default function Alterations() {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (tailor) => {
        setCart((prev) => [...prev, tailor]);
        Alert.alert("Added to Cart", `${tailor.serviceName} by ${tailor.tailorName} has been added to your cart.`);
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerTitle}>Select Alteration</Text>
            <FlatList
                data={MOCK_TAILORS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.avatarWrapper}>
                            {item.image ? (
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarFallback}>
                                    <Text style={styles.avatarFallbackText}>
                                        {item.tailorName.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.infoSection}>
                            <Text style={styles.tailorName} numberOfLines={1}>{item.tailorName}</Text>
                            <Text style={styles.serviceName} numberOfLines={1}>{item.serviceName}</Text>
                            <View style={styles.metaRow}>
                                <Text style={styles.metaText}>★ {item.rating}</Text>
                                <Text style={styles.metaDivider}>•</Text>
                                <Text style={styles.metaText}>{item.distance}</Text>
                            </View>
                        </View>

                        <View style={styles.actionSection}>
                            <Text style={styles.priceText}>₹{item.price}</Text>
                            <Pressable
                                style={styles.addButton}
                                onPress={() => handleAddToCart(item)}
                            >
                                <Text style={styles.addButtonText}>Add to Cart</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No alteration services found nearby.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#18181b",
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 8,
    },
    listPadding: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 40,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e4e4e7",
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#ffffff",
    },
    avatarWrapper: {
        marginRight: 12,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#f4f4f5",
    },
    avatarFallback: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#f4f4f5",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarFallbackText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#52525b",
    },
    infoSection: {
        flex: 1,
        marginRight: 8,
    },
    tailorName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#18181b",
    },
    serviceName: {
        fontSize: 13,
        color: "#52525b",
        marginTop: 2,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },
    metaText: {
        fontSize: 12,
        color: "#71717a",
    },
    metaDivider: {
        fontSize: 12,
        color: "#d4d4d8",
        marginHorizontal: 6,
    },
    actionSection: {
        alignItems: "flex-end",
    },
    priceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#18181b",
        marginBottom: 8,
    },
    addButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#18181b",
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#ffffff",
    },
    emptyContainer: {
        marginTop: 60,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#71717a",
    },
});
