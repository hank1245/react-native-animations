import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import BackgroundImg from "./assets/image.jpeg";
import React, { useRef, useState } from "react";
import {
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { MOCK_DATA } from "./constant";
import Item from "./components/Item";

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <Animated.View style={styles.animationContainer}>
        <Image source={BackgroundImg} style={[styles.background]} />
        {MOCK_DATA.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4f5555",
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    flex: 1,
    backgroundColor: "#4f5555",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: width,
    height: height,
  },
});
