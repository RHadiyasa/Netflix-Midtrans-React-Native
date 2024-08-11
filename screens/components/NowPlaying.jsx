import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import fetchMovie from "../../lib/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { connectAxios } from "../../lib/axios";

const NowPlaying = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovie.get("/movie/now_playing");
      // console.log("data : ", Object.keys(response.data.results[0]));
      // console.log("data : ", response.data.results[0].backdrop_path);
      // console.log(response);
      // console.log("Results: ", response.data.results);
      setMovies(response.data.results);
    };

    fetchData();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const buyTicket = async () => {
    const axiosInstance = await connectAxios();
    const movieId = selectedMovie.id.toString();

    const response = await axiosInstance.get(`/tickets/`, {
      params: { movieId },
    });

    const existingMovie = response.data.find((movie) => movie.id === movieId);

    console.log(existingMovie);

    if (existingMovie) {
      // add quantity kalo movie sudah ada
      try {
        await axiosInstance.patch(`/tickets/${movieId}`, {
          quantity: existingMovie.quantity + 1,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // Kalo film belum ada / tidak ditemukan, maka tambah sebagai list baru
      try {
        await axiosInstance.post("/tickets", {
          id: movieId,
          original_title: selectedMovie.original_title,
          poster_path: selectedMovie.poster_path,
          quantity: 1,
        });
      } catch (error) {
        console.error(error);
      }
    }

    closeModal();
  };

  const truncateText = (text, maxLength = 200) => {
    if (text?.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + "...";
  };

  return (
    <View className="h-[300]">
      <View className="flex-row items-center mb-2 gap-1">
        <Ionicons name="play-circle-outline" size={14} color={"white"} />
        <Text className="font-semibold w-full text-white text-base">
          Now Playing
        </Text>
      </View>
      <ScrollView horizontal={true}>
        {movies?.map((movie) => (
          <View key={movie.id} className="p-1">
            <TouchableOpacity onPress={() => openModal(movie)}>
              <Image
                source={{
                  uri: `https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
                }}
                style={{ width: 160, height: 220, borderRadius: 10 }}
              />
              {/** DISPLAY TEXT */}
              {/* <View className="w-full items-center mt-2">
                <Text className="text-base text-center font-semibold text-white">
                  {truncateText(movie.title, 32)}
                </Text>
                <Button title={"Details"} onPress={() => {}} />
              </View> */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {/* Add Gesture Handler -> npm install react-native-gesture-handler */}
          <View className="flex-1 bg-black/80">
            <View className="bg-black flex-1 items-center mt-60 rounded-xl">
              <View className="w-full">
                <Image
                  source={{
                    uri: `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${selectedMovie.backdrop_path}`,
                  }}
                  style={{
                    width: "100%",
                    height: 350,
                    borderRadius: 12,
                  }}
                />
                <LinearGradient
                  // Background Linear Gradient
                  colors={[
                    "rgba(0,0,0,0)",
                    "rgba(0,0,0,0.1)",
                    "rgba(0,0,0,0.5)",
                    "rgba(0,0,0,0.9)",
                    "rgba(0,0,0,1)",
                  ]}
                  style={styles.background}
                />
                <View className="px-10">
                  <Text className="text-white text-3xl font-bold">
                    {selectedMovie.title}
                  </Text>
                  <Text className="text-white">
                    {truncateText(selectedMovie.overview, 250)}
                  </Text>
                </View>
              </View>
              <View
                className="py-5 flex-row"
                style={{
                  gap: 10,
                }}
              >
                <Button color={"red"} title="Close" onPress={closeModal} />
                <Button
                  color={"green"}
                  title="Buy Tickets"
                  onPress={buyTicket}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 400,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});
