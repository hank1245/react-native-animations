import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  withTiming,
  withSpring,
} from "react-native-reanimated";

function Item({ item }) {
  const pressed = useSharedValue(false);
  const tapHandler = useAnimatedGestureHandler({
    onStart: (event) => {
      pressed.value = true;
    },
    onFinish: (event) => {
      pressed.value = false;
    },
  });
  const itemStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "#FEEF86" : "white",
      transform: [{ scale: withTiming(pressed.value ? 0.5 : 1) }],
    };
  });

  return (
    <TapGestureHandler onGestureEvent={tapHandler} key={item.macAddress}>
      <Animated.View
        style={[styles.button, { left: item.x }, { bottom: item.y }, itemStyle]}
      >
        <Text>{item.type}</Text>
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Item;
