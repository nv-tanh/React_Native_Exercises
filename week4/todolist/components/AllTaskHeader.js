import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const AllTaskHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPressIcon}>
        <View style={{justifyContent:"center"}}>
          <AntDesign
            name="appstore-o"
            size={28}
            color="#4AA2F4"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>All Tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  icon: {
    marginLeft: 8
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    opacity: 0.7
  }
});

export default AllTaskHeader;
