import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = ({ size }: any) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/images/lottieLoading.json")}
        loop
        autoPlay
      />
    </View>
  );
};

export default Loading;
