import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import Tickets from "../screens/Tickets";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((store) => store.user.userData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkLoggedInUser = async () => {
    const loggedInUser = await AsyncStorage.getItem("loggedInUser");

    if (loggedInUser) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(loggedInUser),
      });
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  console.log("Store: ", user); // []

  if (loading) {
    return (
      <View className="min-h-screen items-center justify-center">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName={user ? "Profile" : "Home"}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tickets"
        component={Tickets}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
