import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import moment from "moment";
import { Card, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default (renderItem = props => {
  const item = props.item;
  const onPressPublisher = props.onPressPublisher;
  return (
    <Card title={item.title} image={{ uri: item.urlToImage }}>
      <View style={styles.row}>
        <Text style={styles.label}>Source</Text>
        <TouchableOpacity onPress={onPressPublisher}>
          <Text
            style={[
              styles.info,
              { color: "#03A9F4", textDecorationLine: "underline" }
            ]}
          >
            {item.source.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginBottom: 10 }}>{item.content}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Published</Text>
        <Text style={styles.info}>
          {moment(item.publishedAt).format("LLL")}
        </Text>
      </View>
      <Button
        icon={<Icon />}
        title="Read more"
        backgroundColor="#03A9F4"
        onPress={() => onPress(item.url)}
      />
    </Card>
  );
});

const onPress = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  });
};

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  header: {
    height: 30,
    width: "100%",
    backgroundColor: "pink"
  },
  row: {
    flexDirection: "row"
  },
  label: {
    fontSize: 16,
    color: "black",
    marginRight: 10,
    fontWeight: "bold"
  },
  info: {
    fontSize: 16,
    color: "grey"
  }
});
