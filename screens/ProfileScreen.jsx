import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import NowPlaying from "./components/NowPlaying";
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import TvPopular from "./components/TvPopular";
import Ionicons from "react-native-vector-icons/Ionicons";
import useNowPlayingData from "../hooks/useNowPlayingData";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import Header from "./components/Header";

const ProfileScreen = () => {
  // const navigation = useNavigation();
  const user = useSelector((store) => store.user);

  const [banner, setBanner] = useState([]);
  const { nowPlaying } = useNowPlayingData();

  useEffect(() => {
    setBanner(nowPlaying);
  }, [nowPlaying]);

  // console.log("now Playing: ", nowPlaying);
  // console.log("Hasil: ", banner );

  const truncateText = (text, maxLength = 200) => {
    if (text?.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + "...";
  };


  return (
    <SafeAreaView className="bg-black items-center min-h-screen">
      <StatusBar barStyle={"light-content"} />

      {/* <View className="flex-row items-center justify-between w-full gap-x-3 px-4 mt-16">
        <Text className="font-bold text-2xl py-5 text-white text-center">
          Gosling
        </Text>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Ionicons
            style={{ color: "white" }}
            name={"grid-outline"}
            size={18}
          />
        </TouchableOpacity>
      </View> */}

      <Header />
      <View>
        <ScrollView>
          <View className="h-[500]">
            <ImageBackground
              source={{
                uri: `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${banner.backdrop_path}`,
              }}
              style={{
                width: "100%",
                height: "100%",
                shadowOpacity: "100%",
                shadowColor: "black",
              }}
              resizeMode="cover"
            >
              {/* Untuk membuat background gradient */}
              <LinearGradient
                // Background Linear Gradient
                colors={[
                  "transparent",
                  "rgba(0,0,0,0)",
                  "rgba(0,0,0,0.2)",
                  "rgba(0,0,0,0.6)",
                  "rgba(0,0,0,1)",
                ]}
                style={styles.background}
              >
                <View className="h-full bg-black/50 justify-between pb-10 px-5">
                  <Text className="text-white/50 text-right mt-5 font-semibold">
                    Recomendation for {user.userData?.username}
                  </Text>
                  <View>
                    <View className="flex-row">
                      <View className="flex-row items-center gap-1 mb-3">
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color={"white"}
                        />
                        <Text className="text-white">
                          {banner.release_date}
                        </Text>
                      </View>
                      <View className="flex-row items-center gap-1 mb-3 px-5">
                        <Ionicons
                          name="thumbs-up-outline"
                          size={15}
                          color={"white"}
                        />
                        <Text className="text-white">{banner.vote_count}</Text>
                      </View>
                    </View>
                    <Text className="text-white font-bold text-5xl">
                      {banner.original_title}
                    </Text>
                    <Text className="text-white text-sm w-3/4">
                      {banner.overview}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
          <View className="pl-2 mt-5 mb-32">
            <NowPlaying />
            <Upcoming />
            <Popular />
            <TopRated />
            <TvPopular />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 500,
  },
});
