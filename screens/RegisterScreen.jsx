import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../components/Logo";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomeButton from "../components/CustomeButton";
import { connectAxios } from "../lib/axios";

const RegisterScreen = ({ navigation }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    const axiosInstance = await connectAxios();
    
    if (password !== confirmPassword) {
      Alert.alert("Password not match", "Please input password");
      return;
    }
    try {
      const usernameCheck = await axiosInstance.get("/users", {
        params: { username },
      });
  
      if (usernameCheck.data.length > 0) {
        Alert.alert("Username already registered");
        return;
      }
      
      const response = await axiosInstance.post("/users", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Registration successful", "You can login now!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onTogglePasswordPress = () => {
    setVisiblePassword(!visiblePassword);
  };
  const onToggleConfirmPasswordPress = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4 px-8">
        <View className="flex flex-row items-center mb-5">
          <Logo width={50} height={50} />
          <Text className="text-2xl font-bold ml-2">Register to Gosling</Text>
        </View>
        <View className="w-full space-y-2">
          <View className="grid gap-2">
            <Text>Username</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              className="bg-gray-300 p-2 px-4 rounded-lg"
              placeholder="Username"
              autoCapitalize="none"
            />
          </View>
          <View className="grid gap-2">
            <Text>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-gray-300 p-2 px-4 rounded-lg"
              placeholder="Your Email"
              keyboardType="email-address"
            />
          </View>
          <View className="grid gap-2">
            <Text>Password</Text>
            <View className="flex flex-row items-center">
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!visiblePassword}
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
          <View className="grid gap-2">
            <Text>Confirm Password</Text>
            <View className="flex-row items-center">
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!visibleConfirmPassword}
                className="bg-gray-300 p-2 px-4 rounded-lg w-full"
                placeholder="Confirm Password"
              />
              <TouchableOpacity
                className="pl-3 absolute right-5"
                onPress={onToggleConfirmPasswordPress}
              >
                <Ionicons
                  name={
                    visibleConfirmPassword ? "eye-outline" : "eye-off-outline"
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text>{username}</Text>
          <Text>{email}</Text>
          <Text>{password}</Text>
          <Text>{confirmPassword}</Text>
        </View>
        <View className="mt-10">
          <CustomeButton title={"Register"} onPress={handleRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
