import React, { Component, useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import SideMenu from './SideMenu';
import Sidebar from 'react-native-sidebar';
import Drawer from 'react-native-drawer';
import Modal from "react-native-modal";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import LeftBar from './LeftBar';
import Loader from '../loader/Loader';
import Test from '../Test';
import { ScrollView, Dimensions, Platform} from 'react-native';

const { width } = Dimensions.get("window");
export default function NavbarContainer({ navigation }: { navigation: any }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const menu = <Test navigator={navigator} />;
    const [open, setOpen] = useState<boolean>(false)
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
        'left',
    );
    const changeDrawerPosition = () => {
        if (drawerPosition === 'left') {
            setDrawerPosition('right');
        } else {
            setDrawerPosition('left');
        }
    };

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={() => drawer.current?.closeDrawer()}
            />
        </View>
    );
    const handlePress = () => {
        setOpen(true)
    }
    const callParentScreenFunction = () => {
        // If needed, can be  called
        // when pressed in the SideMenu
      };
    return (
        <>
            <View style={styles.navbarContainer}>
                <TouchableHighlight onPress={() => handlePress()}>
                    <View style={styles.user} >
                        <Text style={styles.red}>
                            {user?.username && user?.username.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.center}>
                    <Icon name="trophy" color='#FFFFFF' size={16} style={styles.icon} />
                    <Text style={styles.bright}>DREAM 11</Text>
                </View>
                <View style={styles.last}>
                    <IonicIcon name="notifications-outline" color='#FFFFFF' size={16} style={styles.icon} />
                    <Icon name="wallet" color='#FFFFFF' size={16} />
                </View>
            </View>
            <Modal
                isVisible={open}
                // Android back press // Swipe to discard
                animationIn="slideInLeft" // Has others, we want slide in from the left
                animationOut="slideOutLeft" // When discarding the drawer
                swipeDirection="left" // Discard the drawer with swipe to left
                useNativeDriver // Faster animation
                hideModalContentWhileAnimating // Better performance, try with/without
                propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal) // Needs to contain the width, 75% of screen width in our case
                style={styles.sideMenuStyle}
            >
                <Text>rajesh</Text>
                <SideMenu/>
                <Button title="close" onPress={() => setOpen(false)} />
            </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    navbarContainer: {
        backgroundColor: '#9133f0',
        height: 40,
        padding: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    user: {
        borderRadius: 10,
        backgroundColor: '#ffffff',
        color: '#9133f0',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    center: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    last: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    bright: {
        color: '#FFFFFF'
    },
    red: {
        color: '#9133f0',
        textAlign: 'center',
        fontSize: 12,
        textAlignVertical: "center",
        alignSelf: 'center'
    },
    icon: {
        marginRight: 5
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    leftBar: {
        position: 'absolute',
        left: 0,
        right: 0
    },
    dContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75 // SideMenu width
    }
});

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}