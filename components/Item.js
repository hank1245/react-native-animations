import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
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
  const [count, setCount] = useState(0);
  const tapHandler = useAnimatedGestureHandler({
    onStart: (event) => {
      pressed.value = true;
      runOnJS(setCount)(count + 1);
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
        <Text>{count}</Text>
      </Animated.View>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  button: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
});

export default Item;
