import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomeButton = ({ title, onPress }) => {
  
  return (
    // TouchableOpacity -> Komponen dari react native untuk membuat elemen yang dapat disentuh dengan feedback
    <TouchableOpacity className="bg-blue-400 px-7 py-2 mt-3 rounded-lg" onPress={onPress}>
      <Text className="font-bold text-lg text-white">{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3490dc",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CustomeButton;
