import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomeButton from "../components/CustomeButton";
import React from "react";
import Logo from "../components/Logo";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView />
      <Logo width={120} height={120} />
      <Text className="text-base font-semibold mt-5">Welcome to,</Text>
      <Text className="text-2xl font-bold">Gosling App Course</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {/* <Button
          color="#000"
          title="Login"
          onPress={() => Alert.alert("Button Pressed")}
        /> */}
        <CustomeButton
          onPress={() => navigation.navigate("Login")}
          title="Login to Gosling"
        />
      </View>
      <View className="flex-row justify-center gap-1">
        <Text className="font-medium text-base">Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="font-bold text-base text-blue-800">Register here</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefefe",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
