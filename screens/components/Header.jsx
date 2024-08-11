import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View className="flex-row items-center justify-between w-full gap-x-3 px-4">
      <Text className="font-bold text-2xl py-5 text-white text-center">
        Gosling
      </Text>
      <TouchableOpacity onPress={handleOpenDrawer}>
        <Ionicons style={{ color: "white" }} name={"grid-outline"} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
