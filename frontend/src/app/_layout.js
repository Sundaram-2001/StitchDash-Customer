import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

export function RouteLayout() {
  useEffect(() => {
    const checkProfileAndSession = async () => {
      try {
        const {data:{session}}=await supabase.auth.getSession()
        if(!session){
          router.replace("/login")
          return
        }
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("account_type")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Failed to execute query", profileError);
          Alert.alert("Something went wrong, but don’t fret");
          return;
        }
        if(!profile||profileError){
          router.replace("/onboarding")
          return
        }
        if(profile.account_type!=="customer"){
          Alert.alert("Access Deneid, this account is already registered as tailor!")
          await supabase.auth.signOut()
          router.replace("/login")
          return
        }

        //session and profile exist
        router.replace("/home")

        
      } catch (error) {
        Alert.alert("Something went wrong, but don't fret")
        console.error("Error inside session check handler:", error);
        return
      }
    }
    //session check during the initial boot of the app
    checkProfileAndSession()
    
    //hadling auth state change when the user is running the app
    const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        checkProfileAndSession(session)
      }
      if (event === "SIGNED_OUT") {
        router.replace("/login")
      }
    })
    return ()=>subscription.unsubscribe()
  }, []); 

  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}