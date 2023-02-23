import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
} from "react-native";
import BackgroundImg from "./assets/image.jpeg";
import React, { useState, createRef, useEffect } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { translate } from "@shopify/react-native-skia";
import Page from "./components/Page";

const Words = ["Nice", "to", "see", "you"];

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      contentContainerStyle={styles.container}
    >
      {Words.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
