import { useEffect, useState } from "react";
import fetchMovie from "../lib/api";

const useNowPlayingData = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  // Untuk Banner
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovie.get("/movie/now_playing");
      // console.log("data : ", Object.keys(response.data.results[0]));
      // console.log("data : ", response.data.results[0].backdrop_path);
      // console.log(response);

      const responseLength = response.data.results.length;

      function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      const randomInRange = getRandomNumber(1, responseLength - 1);
      //   console.log(Math.floor(randomInRange));

      // Menghasilkan rekomendasi banner random berdasarkan now_playing
      result = response.data.results[Math.floor(randomInRange)];
      setNowPlaying(result);
    };

    fetchData();
  }, []);
  return { nowPlaying };
};

export default useNowPlayingData;
