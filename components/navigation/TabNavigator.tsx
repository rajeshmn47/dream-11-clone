
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MyStackNavigator from "./MyStackNavigator";
import MainStackNavigator from "./MainStackNavigator";
import HomeScreen from "../HomeScreen";
import Icon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/Octicons";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{
                tabBarLabel: 'Home',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home" color='#9133f0' size={14} />
                ),
            }}
                component={MainStackNavigator} />
            <Tab.Screen name="My Matches" component={MyStackNavigator}
                options={{
                    tabBarLabel: 'My Matches',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <SimpleIcon name="trophy" color='#9133f0' size={14} />
                    ),
                }} />
            <Tab.Screen name="Feed" component={MyStackNavigator}
                options={{
                    tabBarLabel: 'Feed',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcon name="feed-discussion" color='#9133f0' size={14} />
                    ),
                }} />
            <Tab.Screen name="Groups" component={MyStackNavigator}
                options={{
                    tabBarLabel: 'Groups',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <SimpleIcon name="people" color='#9133f0' size={14} />
                    ),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;