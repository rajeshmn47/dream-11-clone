import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal"
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SideMenu from "./SideMenu";
import { useState } from "react";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

export default function Navbar() {
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const [open, setOpen] = useState<boolean>(false);
    const width = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <View style={{ marginRight: 10 }}>
                        <Icon name="menu" color="#fff" size={20} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textColor}>Powerplay{user?.username}</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={{ marginRight: 10 }}>
                    <Ionicons name="notifications" color="#fff" size={20} />
                </View>
                <View style={{ marginRight: 10 }}>
                    <Ionicons name="wallet" color="#fff" size={20} />
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
                <SideMenu />
                <Button title="close" onPress={() => setOpen(false)} />
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        color: 'white',
        height: 100,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftContainer: {
        backgroundColor: 'black',
        color: 'white',
        height: 100,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: (width-20) / 2
    },
    rightContainer: {
        backgroundColor: 'black',
        color: 'white',
        height: 100,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: (width-30) / 2
    },
    match: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        margin: 15,
        borderRadius: 10,
        height: 150,
        backgroundColor: 'white',
        padding: 10,
        paddingHorizontal: 5
    },
    team: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: 40
    },
    subContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        height: 50,
        padding: 10
    },
    stretch: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
    },
    teamContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 5,
        borderRadius: 2,
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2,
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    matchDate: {
        width: 100,
        fontSize: 10,
        flex: 2,
        alignItems: 'center'
    },
    dateText: {
        fontSize: 12,
        color: 'rgb(94, 91, 91)'
    },
    title: {
        overflow: 'hidden',
    },
    textColor: {
        color: 'white'
    },
    sideMenuStyle: {
        margin: 0,
        width: width * 0.75 // SideMenu width
    }
});