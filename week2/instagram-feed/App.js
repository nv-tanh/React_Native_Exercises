import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform
} from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { Asset } from "expo-asset";

const instagramLogo = "./assets/logo.png";

const feedData = [
  {
    id: 1,
    name: "kingtxx98",
    image: require("./assets/12.jpg"),
    likeCount: 128,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 2,
    name: "kingtxx98",
    image: require("./assets/7.jpg"),
    likeCount: 36,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 3,
    name: "kingtxx98",
    image: require("./assets/9.jpg"),
    likeCount: 78,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 4,
    name: "kingtxx98",
    image: require("./assets/4.jpg"),
    likeCount: 46,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 5,
    name: "kingtxx98",
    image: require("./assets/5.jpg"),
    likeCount: 99,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 6,
    name: "kingtxx98",
    image: require("./assets/2.jpg"),
    likeCount: 757,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 7,
    name: "kingtxx98",
    image: require("./assets/11.jpg"),
    likeCount: 42,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 8,
    name: "kingtxx98",
    image: require("./assets/8.jpg"),
    likeCount: 220,
    avatar: require("./assets/avt.jpg")
  },
  {
    id: 9,
    name: "kingtxx98",
    image: require("./assets/10.jpg"),
    likeCount: 45,
    avatar: require("./assets/avt.jpg")
  }
];

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ff0000",
        paddingTop: Platform.OS === "android" ? 25 : 0
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require(instagramLogo)}
            style={styles.logo}
            resizeMode="contain"
          />
          <Feather
            name="inbox"
            size={27}
            color="black"
            style={{ position: "absolute" }}
          />
        </View>
        <ScrollView style={styles.mainScroll}>
          {feedData.map(item => {
            return (
              <View style={styles.feedItem} key={item.id}>
                <View style={styles.user}>
                  <View
                    style={{
                      flex: 0.15,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={item.avatar}
                      style={styles.imgAvt}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.infor}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        fontFamily: "Roboto"
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>
                <View style={{ height: 300, position: "relative" }}>
                  <Image
                    source={item.image}
                    style={styles.imgItem}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.reaction}>
                  <AntDesign
                    name="hearto"
                    size={25}
                    style={styles.reactionBtn}
                    onPress={() => {
                      Alert.alert("like");
                    }}
                  />
                  <Feather
                    name="message-square"
                    size={25}
                    style={styles.reactionBtn}
                    onPress={() => {
                      Alert.alert("comment");
                    }}
                  />
                  <Feather
                    name="share"
                    size={25}
                    style={styles.reactionBtn}
                    onPress={() => {
                      Alert.alert("share");
                    }}
                  />
                </View>
                <View style={styles.likes}>
                  <AntDesign
                    name="heart"
                    size={25}
                    style={styles.reactionBtn}
                    color="#d50015"
                  />
                  <Text style={{ fontFamily: "sans-serif-condensed" }}>
                    {item.likeCount} likes
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flex: 0.1,
    flexDirection: "row-reverse",
    backgroundColor: "#f3f6fa",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: null,
    height: 44
  },
  mainScroll: {
    flex: 0.9
  },
  feedItem: {},
  user: {
    flexDirection: "row",
    paddingVertical: 7
  },
  imgAvt: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2
  },
  infor: {
    flex: 0.75,
    justifyContent: "center"
  },
  imgItem: {
    flex: 1,
    width: null,
    height: null
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
  },
  reactionBtn: {
    marginHorizontal: 7
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#c0c0c0",
    paddingVertical: 5
  }
});
