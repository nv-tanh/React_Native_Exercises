import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DialogInput from "react-native-dialog-input";

import Header from "../components/AllTaskHeader";
import TodoItem from "../components/TodoItem";
import TODOS from "../Util";

export default function AllScreen(props) {
  const [todoList, setTodoList] = useState(TODOS);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const onToggleIcon = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === "Done" ? "Active" : "Done";
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);
  };
  const onToggleTodo = todo => {
    props.navigation.navigate("SingleTodo", {
      updatedTodo: todo
    });
  };

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const onSubmitTodo = str => {
    const newTodo = {
      id: todoList.length + 1,
      status: "Active",
      body: str
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setIsDialogVisible(false);
  };

  showDialog = () => {
    setIsDialogVisible(true);
  };

  onHandleCancel = () => {
    setIsDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Header onPressIcon={props.navigation.openDrawer} />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <View style={styles.cards}>
            <ScrollView>
              {todoList.map(todo => {
                return (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleTodo={onToggleTodo}
                    onToggleIcon={onToggleIcon}
                    onDeleteTodo={onDeleteTodo}
                  />
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.buttonInput} onPress={showDialog}>
              <Ionicons name="ios-add" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={"input"}
          message={"new task"}
          hintInput={"HINT INPUT"}
          submitInput={inputText => {
            onSubmitTodo(inputText);
          }}
          closeDialog={() => {
            onHandleCancel();
          }}
        />
      </ImageBackground>
    </View>
  );
}

AllScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ecf0f1"
  },
  header: {
    flex: 0.15
  },
  cards: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 0.85,
  },
  todoInput: {
    width: "95%",
    minHeight: 30,
    color: "black",
    borderWidth: 1,
    marginTop: "20%",
    marginBottom: "5%",
    borderColor: "grey"
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    marginTop: 30,
    marginBottom: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 50,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "blue",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  buttonInput: {
    backgroundColor: "#4AA2F4",
    position: "absolute",
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15
  }
});
