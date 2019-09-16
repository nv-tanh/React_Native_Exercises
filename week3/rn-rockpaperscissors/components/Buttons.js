import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CHOICES from "../choices";

function Buttons(props) {
  return (
    <View style={styles.container}>
      {CHOICES.map(choice => {
        return (
          <TouchableOpacity
            style={styles.buttonStyle}
            key={choice.name}
            onPress={() => props.onPressButton(choice.name)}
          >
            <Text style={styles.buttonText}>{choice.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    width: 200,
    margin: 5,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#531e23",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold"
  }
});
