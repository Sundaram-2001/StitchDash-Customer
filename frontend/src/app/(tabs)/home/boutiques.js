import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import BoutiqueCard from "../../components/boutiqueCard.js";

const MOCK_BOUTIQUES = [
    {
        id: "1",
        name: "The Master Atelier",
        distance: "0.8 mi",
        rating: "4.9",
        reviewsCount: "124",
        phone: "+1 (555) 010-9988",
        email: "hello@masteratelier.com",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "2",
        name: "Nouveau Threads",
        distance: "1.5 mi",
        rating: "4.8",
        reviewsCount: "98",
        phone: "+1 (555) 019-8833",
        email: "info@nouveau-threads.com",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "3",
        name: "Heritage Artisans",
        distance: "2.5 mi",
        rating: "4.7",
        reviewsCount: "76",
        phone: "+1 (555) 027-4411",
        email: "contact@heritageartisans.com",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
    }
];

export default function Boutiques() {
    const [boutiques, setBoutiques] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoutiques = async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setBoutiques(MOCK_BOUTIQUES);
            setLoading(false);
        };
        fetchBoutiques();
    }, []);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#006d3d" />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={boutiques}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <BoutiqueCard item={item} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No boutiques found nearby.</Text>
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
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    listPadding: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
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
