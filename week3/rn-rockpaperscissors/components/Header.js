import React from "react";
import { Text, StyleSheet, View } from "react-native";

function Header(props) {
  let textColor = "white";

  switch (props.result) {
    case "Victory!":
      textColor = "blue";
      break;
    case "Defeat!":
      textColor = "red";
      break;
    case "Tie game!":
      textColor = "#7a7a7a";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.resultText, { color: textColor }]}>
        {props.result}
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
