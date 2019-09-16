import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView
} from "react-native";

export default class HomeScreen extends React.Component {
  username = "";
  onPressBtn = () => {
    this.props.navigation.navigate("Chat", {
      username: this.username
    });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text>user name:</Text>
        <TextInput
          style={styles.txtInput}
          placeholder="Type your name here!"
          onChangeText={value => {
            this.username = value;
          }}
        />
        <Button
          title="Enter chatroom"
          style={styles.btn}
          onPress={this.onPressBtn}
        />
      </KeyboardAvoidingView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  txtInput: {
    width: "70%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    textAlign: "center"
  },
  btn: { color: "#841584" }
});
