import React from "react";
import { SafeAreaView, Text, View, Switch, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/Feather";
import IonicIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { loadToken, logout } from "../../actions/userAction";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        margin: 0,
        flex: 1,
        fontStyle: 'italic',
        fontSize: 18
    },
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#000000",
        padding: 2,
        paddingLeft: 20,
        paddingBottom: 10
    },
    title: {
        marginTop: 15,
        marginBottom: 10,
        color: "#444",
        fontSize: 18
    },
    textColor: {
        color: "#FFFFFF",
        fontSize: 18
    },
    text: {
        fontSize: 16,
        fontStyle: 'normal'
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
        marginTop: 20,
        marginLeft: 15,
        padding: 4,
        fontSize: 16
    },
    icon: {
        marginRight: 15
    },
    arrowicon:{
        marginLeft:100
    }
});

class SideMenu extends React.Component {
    state = {
        toggle_option_one: false
    };

    callParentScreenFunction = () => this.props.callParentScreenFunction();

    onPress = () => {
        const { dispatch } = this.props;
        dispatch(logout())
        dispatch(loadToken())
    }

    render() {
        return (
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <IonicIcon name="account-circle" style={styles.icon} size={25} color='#FFFFFF' />
                        <Text style={styles.textColor}>Rajesh</Text>
                        <Icon name="arrow-right" style={styles.arrowicon} size={20} color='#FFF' />
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="wallet" style={styles.icon} size={20} />
                        <Text style={styles.text}>Wallet Balance</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="people" style={styles.icon} size={20} />
                        <Text style={styles.text}>Community</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="settings" style={styles.icon} size={20} />
                        <Text style={styles.text}>settings</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <Icon name="game-controller" style={styles.icon} size={20} />
                        <Text style={styles.text}>How to play</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <IonicIcon name="account-group-outline" style={styles.icon} size={20} />
                        <Text style={styles.text}>terms & conditions</Text>
                    </View>
                    <View style={styles.sidebarItem}>
                        <IonicIcon name="help" style={styles.icon} size={20} />
                        <Text style={styles.text}>Help & Support</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.onPress()}>
                        <View style={styles.sidebarItem}>
                            <IonicIcon name="logout" style={styles.icon} size={20} />
                            <Text style={styles.text}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text onPress={this.callParentScreenFunction} style={styles.link}>
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default connect()(SideMenu);

const Title = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const SwitchText = ({ text }) => {
    return <Text style={styles.switchText}>{text}</Text>;
};

const Description = ({ text }) => {
    return <Text style={styles.description}>{text}</Text>;
};