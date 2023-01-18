import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const options = ['Personal','Professional','Study','Work Out'];

const Picker = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.setPickerIsVisible(false);
      }}
      style={styles.container}
    >
      <View
        style={[styles.modal, { width: WIDTH - 30 }]}
      >
        <ScrollView>
          {options.map((option, index) => {
            return <Pressable key={index} onPress={() => {
                props.setOption(option)
                props.setPickerIsVisible(false);
                }}>
                <Text style={styles.text}>{option}</Text>
            </Pressable>
          })}
        </ScrollView>
      </View>
    </Pressable>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 90
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
