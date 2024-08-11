import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import fetchMovie from "../../lib/api";

const Popular = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovie.get("/movie/popular");
      // console.log("data : ", Object.keys(response.data.results[0]));
      // console.log("data : ", response.data.results[0].backdrop_path);
      // console.log(response);
      setMovies(response.data.results);
    };

    fetchData();
  }, []);
  return (
    <View className="h-[300]">
      <Text className="font-semibold w-full px-4 text-white text-base mb-2">
        Popular
      </Text>
      <ScrollView horizontal={true}>
        {movies?.map((movie) => (
          <View key={movie.id} className="p-1">
            <TouchableOpacity>
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
    </View>
  );
};

export default Popular;
