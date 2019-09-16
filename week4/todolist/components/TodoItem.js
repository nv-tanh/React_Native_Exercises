import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Alert
} from "react-native";
import { CheckBox } from "react-native-elements";

export default function Cards(props) {
  const checked = props.todo.status === "Done" ? true : false;
  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      "Delete your todo?",
      prompt,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => props.onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };
  const textStyle = {
    textDecorationLine: checked ? "line-through" : "none",
    opacity: !checked ? 0.8 : 0.2
  };
  const shortCut = str => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  };
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => props.onToggleTodo(props.todo)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <View style={[styles.todoItem]}>
        <Text style={[styles.todoText, textStyle]}>
          {shortCut(props.todo.body)}
        </Text>
        <View style={styles.checkBox}>
          <CheckBox
            center
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            checkedColor="#37D7B2"
            onPress={() => props.onToggleIcon(props.todo.id)}
            checked={checked}
            containerStyle={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5
              },
              shadowOpacity: 0.34,
              shadowRadius: 20,

              elevation: 10
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  todoItem: {
    height: 50,
    width: Dimensions.get("window").width - 16,
    marginBottom: 15,
    borderRadius: 50 / 2,
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 20,

    elevation: 10
  },
  todoText: {
    flex: 0.9,
    textAlign: "left",
    marginLeft: 15
  },
  checkBox: {
    flex: 0.1,
    marginRight: 10
  }
});
