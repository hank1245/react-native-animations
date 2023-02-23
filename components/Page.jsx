import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const Size = width * 0.7;

function Page({ index, title, translateX }) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);

    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      Size / 2,
      0,
    ]);

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2,
    ]);

    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    height: Size,
    width: Size,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 80,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default Page;
