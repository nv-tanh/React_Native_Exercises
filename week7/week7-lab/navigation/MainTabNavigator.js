import React from "react";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";

const HomeStack = createStackNavigator({
  Chat: ChatScreen,
  Home: HomeScreen,
});

HomeStack.path = "";

export default HomeStack;
