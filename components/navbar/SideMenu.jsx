import React from "react";
import { SafeAreaView, Text, View, Switch } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import IonicIcon from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        margin: 12,
        flex: 1
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        color: "#444",
        fontSize: 14
    },
    swithBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    switchText: {
        fontSize: 14,
        color: "#222"
    },
    link: {
        padding: 5,
        color: "#892853"
    },
    description: {
        fontSize: 13,
        color: "#555",
        marginTop: 12,
        marginBottom: 6
    },
    sidebarItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    icon: {
        marginRight: 10
    }
});

export default class SideMenu extends React.Component {
    state = {
        toggle_option_one: false
    };

    callParentScreenFunction = () => this.props.callParentScreenFunction();

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <Title title="Timeline" />
                    <View style={styles.sidebarItem}>
                        <Icon name="wallet" style={styles.icon} size={16} />
                        <Text>My Balance</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="logout" style={styles.icon} size={16} />
                        <Text>Logout</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="people" style={styles.icon} size={16} />
                        <Text>People</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="game-controller" style={styles.icon} size={16} />
                        <Text>How to play</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <IonicIcon name="account-group-outline" style={styles.icon} size={16} />
                        <Text>Champions Club</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="settings" style={styles.icon} size={16} />
                        <Text>My Info And Settings</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="more" style={styles.icon} size={16} />
                        <Text>More</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                      
                        <Text>Help & Support</Text>
                    </View>
                    <View style={styles.oneBlock}>
                        <Description text="When enabled, on your timeline we will only show ratings with reviews." />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text onPress={this.callParentScreenFunction} style={styles.link}>
                        Press to call parent function
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}

const Title = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const SwitchText = ({ text }) => {
    return <Text style={styles.switchText}>{text}</Text>;
};

const Description = ({ text }) => {
    return <Text style={styles.description}>{text}</Text>;
};