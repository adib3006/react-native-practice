import { useState } from "react";
import { FlatList, StyleSheet, View, Button } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const startAtGoalHandler = () => {
    setModalIsVisible(true);
  }

  const endAtGoalHandler = () => {
    setModalIsVisible(false);
  }

  const addGoalHandler = (enteredGoalText) => {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAtGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setGoals(currentGoals => {
      return currentGoals.filter((goal)=> goal.id !== id);
    })
  };

  return (
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color='#5e0acc' onPress={startAtGoalHandler}/>
      <GoalInput onCancel={endAtGoalHandler} visible={modalIsVisible} onAddGoal={addGoalHandler} />
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
