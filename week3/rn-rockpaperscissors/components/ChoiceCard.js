import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function ChoiceCard(props) {
  const title =
    props.choice.name &&
    props.choice.name.charAt(0).toUpperCase() + props.choice.name.slice(1);
  let choiceColor = "#7a7a7a";
  if (props.result != "Choose your weapon!" && props.result != "Tie game!") {
    (props.result === "Victory!" && props.player === "Player") ||
    (props.result === "Defeat!" && props.player === "Computer")
      ? (choiceColor = "blue")
      : (choiceColor = "red");
  }

  return (
    <View style={styles.container}>
      <View style={styles.choiceContainer}>
        <Text style={styles.choiceDescription}>{props.player}</Text>
        <View style={[styles.choiceImage, { backgroundColor: choiceColor }]}>
          <Image
            source={props.choice.src}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.choiceCardTitle}>{title}</Text>
      </View>
    </View>
  );
}

export default ChoiceCard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  choiceContainer: {
    flex: 1,
    alignItems: "center"
  },
  choiceDescription: {
    fontSize: 25,
    color: "#250902",
    fontWeight: "bold",
    textDecorationLine: "underline",
    opacity: 0.8
  },
  choiceCardTitle: {
    fontSize: 30,
    color: "#250902",
    opacity: 0.8
  },
  choiceImage: {
    width: 130,
    height: 130,
    backgroundColor: "#ff000f",
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  img: {
    flex: 1,
    width: 70,
    height: 70
  }
});
