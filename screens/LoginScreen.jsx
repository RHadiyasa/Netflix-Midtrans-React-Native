import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Logo from "../components/Logo";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomeButton from "../components/CustomeButton";
import { connectAxios } from "../lib/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert("Username or password cannot be empty");
      return;
    }

    const instanceAxios = await connectAxios();
    try {
      console.log("Masuk");
      const response = await instanceAxios.get("/users", {
        params: { username, password },
      });

      const user = response.data[0];
      console.log("Response : ", user); // {"email": "rafihadiyasa@gmail.com", "id": "d641", "password": "rafi123", "username": "rhadiyasa"}

      if (!user || user.password !== password) {
        Alert.alert("Invalid Login", "Wrong username or password");
        return;
      }

      // AsyncStorage
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));

      dispatch({
        type: "LOGIN",
        payload: user,
      });

      setUsername("");
      setPassword("");
      navigation.navigate("Profile");
    } catch (error) {
      console.error(error);
    }
  };

  const onTogglePasswordPress = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4 px-8">
        <View className="flex flex-row items-center mb-5">
          <Logo width={50} height={50} />
          <Text className="text-2xl font-bold ml-2">Login to Gosling</Text>
        </View>
        <View className="w-full space-y-2">
          <View className="grid gap-2">
            <Text>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="bg-gray-300 p-2 px-4 rounded-lg"
              placeholder="Username"
            />
          </View>
          <View className="grid gap-2">
            <Text>Password</Text>
            <View className="flex flex-row items-center">
              <TextInput
                secureTextEntry={!visiblePassword}
                value={password}
                onChangeText={setPassword}
                className="bg-gray-300 p-2 px-4 rounded-lg w-full"
                placeholder="Password"
              />
              <TouchableOpacity
                className="pl-3 absolute right-5"
                onPress={onTogglePasswordPress}
              >
                <Ionicons
                  name={visiblePassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="mt-10">
          <CustomeButton title={"Login"} onPress={handleLogin} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
