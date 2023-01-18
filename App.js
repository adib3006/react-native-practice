import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  Pressable,
  Text,
  Modal,
} from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import { StatusBar } from "expo-status-bar";
import Picker from "./components/Picker";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [pickerIsVisible, setPickerIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);
  const [option, setOption] = useState("Choose an option...");

  const startAtGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAtGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAtGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a469f1"
          onPress={startAtGoalHandler}
        />

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
            style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>{option}</Text>
            <View style={{flexDirection: 'row'}}>
              {(!pickerIsVisible) && <AntDesign name="down" size={20} color="white" />}
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
          <Picker
            setOption={setOption}
            setPickerIsVisible={setPickerIsVisible}
          />
        </Modal>

        <GoalInput
          onCancel={endAtGoalHandler}
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  onDeleteItem={deleteGoalHandler}
                  text={itemData.item.text}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 4,
    paddingBottom: 24,
  },
});
