import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
} from "react-native";

const LIST_ITEM_COLOR = "#1798DE";

const items = new Array(10).fill(0).map((_, index) => ({ id: index }));

export default function App() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
