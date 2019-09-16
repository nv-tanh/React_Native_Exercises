import React from 'react';
import { Platform, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CompleteScreen from '../screens/CompleteScreen';
import AllScreen from '../screens/AllScreen';
import ActiveScreen from '../screens/ActiveScreen';
import SingleTodoScreen from "../screens/SingleTodoScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const AllStack = createStackNavigator(
  {
    All: AllScreen,
    SingleTodo: SingleTodoScreen
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};


const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};


const tabNavigator = createBottomTabNavigator({
  AllStack: AllStack,
  ActiveStack: ActiveStack,
  CompleteStack: CompleteStack,
});

const Drawer = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Drawer Item 1</Text>
    <Text>Drawer Item 2</Text>
  </View>
);

const drawer = createDrawerNavigator(
  {
    Initial: tabNavigator
  },
  {
    contentComponent: Drawer
  }
);

export default drawer;
