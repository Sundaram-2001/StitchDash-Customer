import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

// 🟢 Change to default export so Expo Router handles mounting states perfectly
export default function RootLayout() {
  useEffect(() => {
    const checkProfileAndSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("BOOT LOGIC: No session found. Going to login.");
          router.replace("/login");
          return;
        }

        console.log("BOOT LOGIC: Active session found for user:", session.user.id);

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("account_type")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("BOOT LOGIC: Supabase query error:", profileError);
          Alert.alert("Something went wrong, but don’t fret");
          return;
        }

        if (!profile) {
          console.log("BOOT LOGIC: Profile row is completely missing.");
          router.replace("/onboarding");
          return;
        }

        console.log("BOOT LOGIC: Found user profile data:", profile);

        if (profile.account_type !== "customer") {
          Alert.alert("Access Denied", "This account is already registered as a tailor!");
          await supabase.auth.signOut();
          router.replace("/login");
          return;
        }

        // Both session and profile exist cleanly
        console.log("BOOT LOGIC: Target validation cleared. Sending home! 🚀");
        router.replace("/home");

      } catch (error) {
        Alert.alert("Something went wrong, but don't fret");
        console.error("Error inside session check handler:", error);
      }
    };

    // 1. Initial boot-up execution check
    checkProfileAndSession();
    
    // 2. Continuous runtime state event stream
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH STATE EVENT CHANGED:", event);
      
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // 🟢 FIXED: Call it empty so it cleanly uses the internal async await declaration frame
        checkProfileAndSession(); 
      }
      if (event === "SIGNED_OUT") {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []); 

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}