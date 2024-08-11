import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import UserProfile from "../screens/UserProfile";
import AppNavigator from "./AppNavigator";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tickets from "../screens/Tickets";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem("loggedInUser");

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <Drawer.Navigator
      initialRouteName="App"
      screenOptions={{
        drawerPosition: "right",
        drawerActiveTintColor: "rgba(255,255,255,0.5)",
        drawerLabelStyle: {
          color: "#FFF",
        },
        drawerStyle: {
          backgroundColor: "#000",
        },
        drawerItemStyle: {
          padding: 8,
        },
      }}
    >
      {/* Wrapping AppNavigator ke dalam drawer */}
      <Drawer.Screen
        name="Home Screen"
        component={AppNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => (
            <View className="flex-row gap-4">
              <Ionicons
                style={{ color: "white" }}
                name={"home-outline"}
                size={18}
              />
              <Text className="text-white">Home</Text>
            </View>
          ),
          // drawerIcon: () => (
          //   <Ionicons
          //     style={{ color: "white" }}
          //     name={"home-outline"}
          //     size={18}
          //   />
          // ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={UserProfile}
        options={{
          drawerLabel: () => (
            <View className="flex-row gap-4">
              <Ionicons
                style={{ color: "white" }}
                name={"person-outline"}
                size={18}
              />
              <Text className="text-white">Profile {user.userData?.username}</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Ticket"
        component={Tickets}
        options={{
          drawerLabel: () => (
            <View className="flex-row gap-4">
              <Ionicons
                style={{ color: "white" }}
                name={"ticket-outline"}
                size={18}
              />
              <Text className="text-white">Your Tickets</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        listeners={(onclick = () => logout())}
        options={{
          drawerLabel: () => (
            <View className="flex-row gap-4">
              <Ionicons
                style={{ color: "white" }}
                name={"exit-outline"}
                size={18}
              />
              <Text className="text-white">Logout</Text>
            </View>
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
