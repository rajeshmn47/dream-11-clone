import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeStackNavigator from "./MainStackNavigator";
import MyStackNavigator from "./MyStackNavigator";
import TabNavigator from "./TabNavigator";
import NavbarContainer from "../navbar/Navbar";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ header: NavbarContainer, drawerPosition: "left" }}>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Match" component={HomeStackNavigator} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;