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
          headerShown:false,
          headerTitleStyle: {
          // color: "#a1a1aa", 
      fontSize: 18,
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
            tabBarIcon:({color,size,focused})=>(
              <Ionicons
                name={focused?"profile":"profile-outline"}
              />
            )
        }}
        />

      
        <Tabs.Screen
        name="profile"
        options={{
            title: "Profile",
            tabBarIcon:({size,color,focused})=>(
              <Ionicons
                name={focused ? "person-circle" : "person-circle"}
                size={size}
                color={color}
              />
            ),  
            headerTitle:"👤 Profile",
            headerTitleStyle:{
              fontWeight:600
            }
        }}
        />
    </Tabs>
    );
}