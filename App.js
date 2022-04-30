import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Keyboard, ScrollView, TouchableOpacity } from "react-native";
import Task from "./components/Task";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const addIcon = <FontAwesome5 name={'plus'} solid style={{fontSize: 20}} />;
  const [emptyField, setEmptyField] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const completeAlert = () =>
    Alert.alert(
      "Are you completed this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.container}>
      {/* Adding ScrollView to enable scrolling */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View style={styles.items}>
            {/* Task Container */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Task text={item} />
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </ScrollView>
    
      {/* Add Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input} 
          placeholder={'Write a Task'} 
          value={task} 
          onChangeText={text => {setTask(text), setEmptyField(true)}}
        />
        <TouchableOpacity onPress={() => handleAddTask()} disabled={!emptyField}>
          <View style={styles.addWrapper}>
            {addIcon}            
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '82%'
    
  },
  addWrapper: {
    backgroundColor: '#FFF',
    width: 50,
    height: 50,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
});
