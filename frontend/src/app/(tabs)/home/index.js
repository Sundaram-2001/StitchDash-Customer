import { useMemo, useState } from "react"
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, ScrollView, Alert } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

const PLACEHOLDER_ITEMS = [
    {
        id: "1",
        tailorName: "Tailor Name Placeholder",
        serviceName: "Service Specialty",
        price: 199,
        rating: "4.8",
        distance: "0.6 mi",
        tags: ["alterations", "trouser"],
    },
    {
        id: "2",
        tailorName: "Tailor Name Placeholder",
        serviceName: "Service Specialty",
        price: 349,
        rating: "4.9",
        distance: "1.2 mi",
        tags: ["alterations", "suit"],
    },
    {
        id: "3",
        tailorName: "Tailor Name Placeholder",
        serviceName: "Service Specialty",
        price: 599,
        rating: "4.7",
        distance: "2.1 mi",
        tags: ["stitching", "dress"],
    },
    {
        id: "4",
        tailorName: "Tailor Name Placeholder",
        serviceName: "Service Specialty",
        price: 999,
        rating: "4.9",
        distance: "1.5 mi",
        tags: ["stitching", "boutiques", "bridal"],
    },
    {
        id: "5",
        tailorName: "Tailor Name Placeholder",
        serviceName: "Service Specialty",
        price: 149,
        rating: "4.6",
        distance: "2.5 mi",
        tags: ["alterations", "boutiques", "blouse"],
    },
]

const CATEGORY_PILLS = [
    { key: "stitching", label: "Stitching" },
    { key: "alterations", label: "Alterations" },
    { key: "boutiques", label: "Boutiques" },
]

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return PLACEHOLDER_ITEMS
        return PLACEHOLDER_ITEMS.filter((item) => {
            return (
                item.tailorName.toLowerCase().includes(query) ||
                item.serviceName.toLowerCase().includes(query) ||
                item.tags.some((tag) => tag.toLowerCase().includes(query))
            )
        })
    }, [searchQuery])

    const handlePillPress = (pillKey) => {
        setSearchQuery(pillKey)
    }

    const handleAddToCart = (item) => {
        Alert.alert("Added to Cart", `${item.serviceName} has been added to your cart.`)
    }

    return (
        <View style={styles.masterContainer}>
            <View style={styles.searchBarWrapper}>
                <Ionicons name="search" size={18} color="#71717a" style={styles.searchIcon} />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search alterations, stitching, suits..."
                    placeholderTextColor="#a1a1aa"
                    style={styles.searchInput}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")} hitSlop={8}>
                        <Ionicons name="close-circle" size={18} color="#a1a1aa" />
                    </Pressable>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.pillScroll}
                contentContainerStyle={styles.pillRow}
            >
                {CATEGORY_PILLS.map((pill) => {
                    const isActive = searchQuery.trim().toLowerCase() === pill.key
                    return (
                        <Pressable
                            key={pill.key}
                            style={[styles.pill, isActive && styles.pillActive]}
                            onPress={() => handlePillPress(pill.key)}
                        >
                            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                {pill.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </ScrollView>

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listPadding}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.avatarPlaceholder} />

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
                        <Text style={styles.emptyText}>No services match your search.</Text>
                    </View>
                }
                ListFooterComponent={<View style={styles.bottomSpacer} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    searchBarWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e4e4e7",
        backgroundColor: "#ffffff",
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#18181b",
        padding: 0,
    },
    pillScroll: {
        flexGrow: 0,
        marginBottom: 16,
    },
    pillRow: {
        flexDirection: "row",
        paddingHorizontal: 24,
        gap: 10,
    },
    pill: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#e4e4e7",
        backgroundColor: "#ffffff",
    },
    pillActive: {
        backgroundColor: "#18181b",
        borderColor: "#18181b",
    },
    pillText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#18181b",
    },
    pillTextActive: {
        color: "#ffffff",
    },
    listPadding: {
        paddingHorizontal: 24,
        paddingBottom: 8,
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
    avatarPlaceholder: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#f4f4f5",
        borderWidth: 1,
        borderColor: "#e4e4e7",
        marginRight: 12,
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
        marginTop: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#71717a",
    },
    bottomSpacer: {
        height: 80,
    }
})
