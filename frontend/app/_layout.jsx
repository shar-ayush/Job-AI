import { SplashScreen, Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState, useCallback } from "react";
import {useFonts} from "expo-font";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync(); // keep splash screen visible until we decide to hide it


export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { checkAuth, user, token, isCheckingAuth } = useAuthStore();

  const [isReady, setIsReady] = useState(false);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Initial auth check
  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setIsReady(true);
      }
    };
    
    initAuth();
  }, []);

  // Handle navigation after auth check and navigation state is ready
  useEffect(() => {
    if (!isReady || !navigationState?.key) return;
    if (isCheckingAuth) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!user && !!token;

    if (isSignedIn) {
      if (inAuthScreen) {
        router.replace("/(tabs)");
      }
    } else {
      if (!inAuthScreen) {
        router.replace("/(auth)");
      }
    }
    
    // Mark navigation as ready after first check
    if (!isNavigationReady) {
      setIsNavigationReady(true);
    }
  }, [isReady, user, token, segments, isCheckingAuth, navigationState, isNavigationReady]);

  // Show loading indicator until everything is ready
  if (!fontsLoaded || !isReady || !isNavigationReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <SafeScreen>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
