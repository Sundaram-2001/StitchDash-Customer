import { Stack } from "expo-router";

export default function HomeStackLayout() {
    return (
    <Stack>
      {/* This renders your main feed screen */}
        <Stack.Screen 
        name="index" 
        options={{ 
            headerShown: false 
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