import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Pressable} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

const [courseGoals, setCourseGoals] = useState([]);
const [modalIsVisible, setModalIsVisible] = useState(false);

function startAddGoalHndler() {
  setModalIsVisible(true);
}

function endGoalHandler() {
  setModalIsVisible(false);
}

function addGoalHandler(enteredGoalText) {
  setCourseGoals(currentCourseGoals => [
    ...currentCourseGoals, 
    { text: enteredGoalText, id: Math.random().toString() },
  ]);
  setModalIsVisible(false);
}

function deleteGoalHandler(id) {
 setCourseGoals(currentCourseGoals => {
   return currentCourseGoals.filter((goal) => goal.id !==id);
 });
}



  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.container}>

      <Button 
        title='Add New Goal' 
        color='#a065ec'
        onPress={startAddGoalHndler}
        />

     <GoalInput visible={modalIsVisible} 
      onAddGoal={addGoalHandler} 
      onCancel={endGoalHandler}
    />

      <View  style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          alwaysBounceVertical={false} 
          renderItem={(itemData) => {
            return <GoalItem 
                      text={itemData.item.text} 
                      id={itemData.item.id}
                      onDeleteItem={deleteGoalHandler}
                    />
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
  container: {
    flex: 1,
   paddingTop: 50,
   paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
 
});
