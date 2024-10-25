import { SafeAreaView, ActivityIndicator, Text } from "react-native";
import React from "react";

const StartPage = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default StartPage;
