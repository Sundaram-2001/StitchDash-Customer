import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
    <Tabs
        screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#208450", 
        tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#eee",
            height: 60, 
            paddingBottom: 8,
        },
        }}
    >
      {/* 1. HOME TAB */}
        <Tabs.Screen
        name="home"
        options={{
            title: "Home", 
        }}
        />

      {/* 2. CHECKOUT TAB */}
        <Tabs.Screen
        name="checkout"
        options={{
            title: "Checkout",
        }}
        />

      {/* 3. PROFILE TAB */}
        <Tabs.Screen
        name="profile"
        options={{
            title: "Profile",
        }}
        />
    </Tabs>
    );
}