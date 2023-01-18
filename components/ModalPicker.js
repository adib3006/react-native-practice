import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
const ModalPicker = () => {
  return (
    <>
      <View
        style={{
          padding: 8,
          marginTop: 10,
          backgroundColor: "#a469f1",
          borderRadius: 2,
        }}
      >
        <Pressable
          onPress={() => {
            setPickerIsVisible(true);
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{option}</Text>
          <View style={{ flexDirection: "row" }}>
            {!pickerIsVisible && (
              <AntDesign name="down" size={20} color="white" />
            )}
            {pickerIsVisible && <AntDesign name="up" size={20} color="white" />}
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={pickerIsVisible}
        onRequestClose={() => {
          setPickerIsVisible(false);
        }}
      >
        <Pressable
          onPress={() => {
            props.setPickerIsVisible(false);
          }}
          style={styles.container}
        >
          <View style={[styles.modal, { width: WIDTH - 30 }]}>
            <ScrollView>
              {options.map((option, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      props.setOption(option);
                      props.setPickerIsVisible(false);
                    }}
                  >
                    <Text style={styles.text}>{option}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default ModalPicker;

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
