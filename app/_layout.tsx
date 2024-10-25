import { useFonts } from "expo-font";
import { router, Slot, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { AuthProvider, useAuth } from "@/context/authContext";

SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    if (!isAuthenticated) {
      router.replace("/signIn");
    }
    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/(app)/home");
    }
  }, [isAuthenticated]);
  return <Slot />;
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
