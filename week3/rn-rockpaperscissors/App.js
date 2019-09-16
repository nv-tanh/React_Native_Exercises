import React from "react";
import { StyleSheet, View, Text, Platform, StatusBar } from "react-native";
import Header from "./components/Header";
import ChoiceCard from "./components/ChoiceCard";
import Buttons from "./components/Buttons";
import ScoreView from "./components/ScoreView";
import CHOICES from "./choices";
import { getRoundOutcome } from "./utils";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userChoice: "",
      computerChoice: "",
      result: "Choose your weapon!",
      count: 0
    };
  }

  onPressButton = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICES.find(
      choice => choice.name === compChoice
    );

    this.setState({
      userChoice: newUserChoice,
      computerChoice: newComputerChoice,
      result,
      count: this.state.count + 1
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gameResultWrapper}>
          <Header result={this.state.result} />
        </View>
        <View style={styles.scoreAndChoiceWrapper}>
          <View style={styles.scoreArea}>
            <ScoreView count={this.state.count} result={this.state.result} />
          </View>
          <View style={styles.choicesContainer}>
            <ChoiceCard
              player="Player"
              choice={this.state.userChoice}
              result={this.state.result}
            />
            <ChoiceCard
              player="Computer"
              choice={this.state.computerChoice}
              result={this.state.result}
            />
          </View>
          <Text style={styles.counter}>total: {this.state.count}</Text>
        </View>
        <View style={styles.buttonstWrapper}>
          <Buttons onPressButton={this.onPressButton} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4ddfe1",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  gameResultWrapper: {
    flex: 0.1
  },
  scoreAndChoiceWrapper: {
    flex: 0.575,
    marginHorizontal: 15,
    borderWidth: 2,
    shadowRadius: 5,
    shadowOpacity: 0.9,
    borderColor: "white",
    backgroundColor: "#fcfcfc",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      height: 5,
      width: 5
    },
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15
  },
  scoreArea: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  choicesContainer: {
    flex: 0.8,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonstWrapper: {
    flex: 0.325,
  },
  counter: {
    fontSize: 15,
    alignSelf: "flex-end",
    opacity: 0.6,
    marginRight: 15
  }
});
