import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { TaskInterface } from "../App";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

interface ListItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  task: TaskInterface;
  onDismiss?: (task: TaskInterface) => void;
}
const { width } = Dimensions.get("window");

export default function ListItem({
  task,
  onDismiss,
  simultaneousHandlers,
}: ListItemProps) {
  const translateX = useSharedValue(0); //js와 native측에서 공유하는 변수. 변경되면 화면 변경
  const THRESHOLD = -width * 0.3;
  const itemHeight = useSharedValue(70);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = 0;
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));
  const iconStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < THRESHOLD ? 1 : 0);
    return { opacity };
  });

  const rTaskStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={[styles.taskContainer, rTaskStyle]}>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={itemHeight.value * 0.4}
          color={"red"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  task: {
    width: "90%",
    height: 70,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: 70,
    width: 70,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
});
