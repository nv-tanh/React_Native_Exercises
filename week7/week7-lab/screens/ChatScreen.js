import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator
} from "react-native";
import database from "../Fire";

export default function ChatScreen() {
  const [userName, setUserName] = useState("John");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
    listenOnChangeMessages();
  }, []);

  readMessages = snapshotData =>
    (typeof snapshotData === "object" && Object.values(snapshotData)) ||
    snapshotData;

  fetchMessages = async () => {
    const snapshot = await database.ref("/messages").once("value");
    const messages = readMessages(snapshot.val());
    setMessages(messages);
    setLoading(true);
  };

  listenOnChangeMessages = () => {
    database.ref("/messages").on("value", snapshot => {
      const messages = this.readMessages(snapshot.val());
      setMessages(messages);
    });
  };

  onSend = nMess => {
    console.log(nMess[0]);
    const newMessage = nMess[0];
    const { user } = newMessage;
    user.name = userName;
    user.avatar = "https://placeimg.com/140/140/any";
    setMessages(GiftedChat.append(messages, nMess));
    database.ref("/messages").push(newMessage);
  };

  return (
    (loading && (
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1
        }}
        inverted={false}
      />
    )) || (
      <View style={styles.container}>
        <ActivityIndicator size="large" loading={loading} />
      </View>
    )
    // <View style={{ flex: 1 }}>
    //   {Platform.OS === "android" ? (
    //     <KeyboardAvoidingView behavior="padding" enabled>
    //       <GiftedChat
    //         messages={this.state.messages}
    //         onSend={messages => this.onSend(messages)}
    //         user={{
    //           _id: 1
    //         }}
    //       />
    //     </KeyboardAvoidingView>
    //   ) : (
    //     <GiftedChat
    //       messages={this.state.messages}
    //       onSend={messages => this.onSend(messages)}
    //       user={{
    //         _id: 1
    //       }}
    //     />
    //   )}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" }
});
