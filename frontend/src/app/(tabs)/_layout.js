import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
    <Tabs
        screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#208450", 
        // 1. 🟢 Force the top navigation header background to be white
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        // 2. 🟢 Remove the bottom border/shadow line under the header globally
        headerShadowVisible: false, 
        
        // 3. 🟢 Force the bottom tab navigation bar background to be white
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60, 
          paddingBottom: 8,
          elevation: 0, 
        },
      }}
    >
      {/* 1. HOME TAB */}
        <Tabs.Screen
        name="home"
        options={{
            headerShadowVisible:false,
            backgroundColor: '#ffffff'
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