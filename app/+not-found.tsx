import { Link, Stack } from "expo-router";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text>
        Not Found
        <Link href="/">Go to home</Link>
      </Text>
    </>
  );
}
