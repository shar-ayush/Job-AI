import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  const [isReady, setIsReady] = useState(false);

  // Run auth check first
  useEffect(() => {
    const init = async () => {
      await checkAuth();        // ensure async complete
      setIsReady(true);         // layout allowed to navigate
    };
    init();
  }, []);

  // Handle navigation ONLY after auth is ready and segments loaded
  useEffect(() => {
    if (!isReady || segments.length === 0) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!user && !!token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    }

    if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isReady, user, token, segments]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
