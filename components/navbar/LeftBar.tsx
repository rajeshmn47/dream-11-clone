import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function LeftBar() {
    const { userToken, user } = useSelector((state: any) => state.user);
    return (
        <>
            <View style={styles.navbarContainer}>
                <View style={styles.center}>
                    <Icon name="trophy" color='#FFFFFF' size={16} style={styles.icon} />
                    <Text style={styles.bright}>DREAM 11</Text>
                </View>
                <View style={styles.last}>
                    <IonicIcon name="notifications-outline" color='#FFFFFF' size={16} style={styles.icon} />
                    <Icon name="wallet" color='#FFFFFF' size={16} />
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    navbarContainer: {
        backgroundColor: '#b50000',
        height: 40,
        padding: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    user: {
        borderRadius: 10,
        backgroundColor: '#ffffff',
        color: '#b50000',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: '#b50000'
    },
    icon: {
        marginRight: 5
    }
});

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}