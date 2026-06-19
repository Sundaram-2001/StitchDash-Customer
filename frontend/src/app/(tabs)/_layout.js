import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabsLayout() {
    return (
    <Tabs
        screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#208450", 
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerShadowVisible: false, 
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
      
        <Tabs.Screen
        name="home"
        options={{
          headerTitle:"📍 Locating you...",
          headerTitleStyle: {
          // color: "#a1a1aa", 
      fontSize: 20,
    },
            headerShadowVisible:false,
            tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
            ),
            backgroundColor: '#ffffff'
        }}
        />

      
        <Tabs.Screen
        name="checkout"
        options={{
            title: "Checkout",
        }}
        />

      
        <Tabs.Screen
        name="profile"
        options={{
            title: "Profile",
        }}
        />
    </Tabs>
    );
}