import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { View } from "react-native";
import Header from "./components/Header";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((store) => store.user);

  return (
    <SafeAreaView className="flex-1 bg-black items-center min-h-screen">
      <StatusBar barStyle={"light-content"} />
      <View>
        <Header />
        <Text className="text-white">{user.userData?.id}</Text>
        <Text className="text-white">{user.userData?.username}</Text>
        <Text className="text-white">{user.userData?.email}</Text>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
