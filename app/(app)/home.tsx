import { useAuth } from "@/context/authContext";
import { Alert, Pressable, Text, View } from "react-native";

function Home() {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    const response = await logout();
    if (!response.success) {
      Alert.alert("Error", response.msg);
    }
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl">Home!!!</Text>
      <Pressable onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}

export default Home;
