import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import BackgroundImg from "./assets/image.jpeg";
import React, { useState, createRef } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = new Animated.Value(1);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const width = Dimensions.get("window").width;

  const MOCK_DATA = [
    {
      type: "컨트롤러",
      x: 200,
      y: 300,
      macAddress: "D2:6A:D6:EC:94:D9",
    },
    {
      type: "컨트롤러",
      x: 600,
      y: 130,
      macAddress: "CF:0F:27:E2:33:32",
    },
    {
      type: "컨트롤러",
      x: 700,
      y: 350,
      macAddress: "F1:93:11:20:A9:B6",
    },
  ];

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );
  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        setPanEnabled(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={BackgroundImg}
        style={{ width: width }}
        resizeMode="contain"
      />
      {MOCK_DATA.map((item) => (
        <React.Fragment key={item.macAddress}>
          <PressableScale
            activeScale={0.85}
            onPress={() => setModalVisible(!modalVisible)}
            style={[styles.button, { left: item.x }, { bottom: item.y }]}
          >
            <Text style={styles.text}>{item.type}</Text>
          </PressableScale>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{item.type}</Text>
                <Text style={styles.modalText}>{item.macAddress}</Text>
                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonText}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    position: "relative",
  },
  image: {
    height: "auto",
  },
  button: {
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
