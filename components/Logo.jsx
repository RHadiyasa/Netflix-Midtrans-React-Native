import React from "react";
import { Image, View } from "react-native";

const Logo = ({ width, height }) => {
  const imageUrl =
    "https://pbs.twimg.com/profile_images/1160067042080280577/6I4XnV2i_400x400.jpg";
  return (
    <View>
      <Image source={{ uri: imageUrl }} width={width} height={height} />
    </View>
  );
};

export default Logo;
