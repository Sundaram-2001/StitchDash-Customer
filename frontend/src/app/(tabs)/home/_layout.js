import { Stack } from "expo-router";

export default function HomeStackLayout() {
    return (
    <Stack>
        <Stack.Screen 
        name="index" 
        options={{ 
            headerShown: false,
            headerTitle:"📍 Locating you.."
        }} 
        />

        <Stack.Screen 
        name="boutiques" 
        options={{ 
            title: "Explore Boutiques",
            headerStyle: { backgroundColor: "#ffffff" },
            headerShadowVisible: false,
            headerTintColor: "#09090b"
        }} 
        />
    </Stack>
    );
}