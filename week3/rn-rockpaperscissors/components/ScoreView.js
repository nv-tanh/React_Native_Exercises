import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";

const myWidth = Dimensions.get("window").width / 3;
let win = 0;
let lose = 0;
let tie = 0;
let winP = 0;
let loseP = 0;
let tieP = 0;

function ScoreView(props) {
  switch (props.result) {
    case "Victory!":
      win++;
      break;
    case "Defeat!":
      lose++;
      break;
    case "Tie game!":
      tie++;
      break;
  }
  if (props.count > 0) {
    winP = Math.round((win / props.count) * 100);
    loseP = Math.round((lose / props.count) * 100);
    tieP = 100 - winP - loseP;
  }
  return (
    <View style={[styles.container, { width: myWidth }]}>
      <View style={styles.column}>
        <View style={[styles.title, { backgroundColor: "blue" }]} />
        <Text style={{ opacity: 0.6 }}>{win}</Text>
        <Text style={styles.percentText}>{winP}%</Text>
      </View>
      <View style={styles.column}>
        <View style={[styles.title, { backgroundColor: "#7a7a7a" }]} />
        <Text style={{ opacity: 0.6 }}>{tie}</Text>
        <Text style={styles.percentText}>{tieP}%</Text>
      </View>
      <View style={styles.column}>
        <View style={[styles.title, { backgroundColor: "red" }]} />
        <Text style={{ opacity: 0.6 }}>{lose}</Text>
        <Text style={styles.percentText}>{loseP}%</Text>
      </View>
    </View>
  );
}

export default ScoreView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderWidth: 1,
    // borderColor: "black"
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowRadius: 5,
    shadowOpacity: 0.9, 
  },
  column: {
    flex: 0.25,
    alignItems: "center"
  },
  title: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  percentText: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6
  }
});
