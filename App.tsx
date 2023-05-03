import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import {
  TapGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function App() {
  const doubleTapRef = useRef<any>();
  const size = useSharedValue(0);
  const opacity = useSharedValue(0);
  const onDoubleTap = () => {
    size.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        size.value = withDelay(500, withTiming(0));
      }
    });
  };
  const onSingleTap = () => {
    if (opacity.value === 1) {
      opacity.value = withTiming(0);
    }
    if (opacity.value === 0) {
      opacity.value = withTiming(1);
    }
  };
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: size.value }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <TapGestureHandler onActivated={onSingleTap} waitFor={doubleTapRef}>
          <TapGestureHandler
            ref={doubleTapRef}
            maxDelayMs={250}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <ImageBackground
                style={styles.image}
                source={require("./assets/image.jpeg")}
              >
                <AnimatedImage
                  source={require("./assets/heart.png")}
                  style={[styles.image, rStyle]}
                  resizeMode={"center"}
                ></AnimatedImage>
              </ImageBackground>
              <AnimatedText style={[styles.text, textStyle]}>
                구독과 좋아요!
              </AnimatedText>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: width,
  },
  text: {
    fontSize: 60,
    position: "absolute",
    top: height / 4,
    left: width / 3,
    fontWeight: "700",
    color: "orange",
  },
});
