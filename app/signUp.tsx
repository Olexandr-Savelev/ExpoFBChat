import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { useAuth } from "@/context/authContext";

const SignUp = () => {
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileUrlRef = useRef("");

  const handleSignUp = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileUrlRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the field.");
      return;
    }

    setLoading(true);

    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileUrlRef.current
    );

    if (response.success) {
      router.replace("/(app)/home");
    } else {
      Alert.alert("Sign Up", response.msg);
    }
    setLoading(false);
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }}
        className="flex-1 gap-8"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            source={require("../assets/images/login.png")}
            resizeMode="contain"
          />
        </View>

        <View className="gap-5">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold text-center text-neutral-700"
          >
            Sign Up
          </Text>

          <View
            style={{ height: hp(6) }}
            className="flex-row px-4 py-2 bg-gray-100 items-center rounded-2xl gap-2"
          >
            <Octicons
              name="people"
              size={hp(3.5)}
              color={"gray"}
            />
            <TextInput
              onChangeText={(value) => (usernameRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="User name"
              placeholderTextColor={"gray"}
            />
          </View>

          <View
            style={{ height: hp(6) }}
            className="flex-row px-4 py-2 bg-gray-100 items-center rounded-2xl gap-2"
          >
            <Octicons
              name="mail"
              size={hp(3.5)}
              color={"gray"}
            />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Email adress"
              placeholderTextColor={"gray"}
            />
          </View>

          <View
            style={{ height: hp(6) }}
            className="flex-row px-4 py-2 bg-gray-100 items-center rounded-2xl gap-2"
          >
            <Octicons
              name="lock"
              size={hp(3.5)}
              color={"gray"}
            />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </View>

          <View
            style={{ height: hp(6) }}
            className="flex-row px-4 py-2 bg-gray-100 items-center rounded-2xl gap-2"
          >
            <Feather
              name="image"
              size={hp(3.5)}
              color={"gray"}
            />
            <TextInput
              onChangeText={(value) => (profileUrlRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Profile Url"
              placeholderTextColor={"gray"}
            />
          </View>

          {loading ? (
            <View className="items-center">
              <Loading size={hp(6)} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSignUp}
              style={{ height: hp(6) }}
              className="bg-blue-400 rounded-2xl justify-center"
            >
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-white font-semibold text-center"
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.9) }}
              className="font-semibold text-neutral-500"
            >
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => {
                router.push("/signIn");
              }}
            >
              <Text
                style={{ fontSize: hp(1.9) }}
                className="font-bold text-blue-400"
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
