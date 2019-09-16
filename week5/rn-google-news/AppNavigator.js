import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import FeedScreen from "./screens/FeedScreen";
import PublisherScreen from "./screens/PublisherScreen";
import Drawer from "./screens/Drawer";

const RootStack = createStackNavigator({
  Feed: FeedScreen,
  Publisher: PublisherScreen
});

const AppNavigator = createDrawerNavigator(
  {
    Feed: RootStack
  },
  {
    contentComponent: Drawer
  }
);

export default AppNavigator;
