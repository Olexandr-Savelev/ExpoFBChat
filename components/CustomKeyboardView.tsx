import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { ReactNode } from "react";

const ios = Platform.OS === "ios";
const CustomKeyboardView = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ios ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
