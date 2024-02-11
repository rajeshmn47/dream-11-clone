import { Dimensions, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";


const w = Dimensions.get('window').width
export default function BottomBar({ navigation, route }: { navigation: any, route: any }) {
    const { isAuthenticated, user } = useSelector((state: any) => state.user);
    const { height, width } = useWindowDimensions();
    const state = useNavigationState(state => state);
    return (
        <View style={{ ...styles.container, width: width }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <View style={route.name == "Home" ? styles.selected : styles.iconContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Icon name="home" color="#fff" size={20} />
                    </View>
                    <Text style={styles.textColor}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyMatches', { userId: user._id })}>
                <View style={route.name == "MyMatches" ? styles.selected : styles.iconContainer}>
                    <View style={{ marginBottom: 10 }}>
                        <Octicons name="database" color="#fff" size={20} />
                    </View>
                    <Text style={styles.textColor}>My Matches</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <View style={{ marginBottom: 10 }}>
                    <IonicIcon name="people-outline" color="#fff" size={20} />
                </View>
                <Text style={styles.textColor}>Community</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{ marginBottom: 10 }}>
                    <AwesomeIcon name="medal" color="#fff" size={20} />
                </View>
                <Text style={styles.textColor}>Winners</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3d7940',
        color: 'white',
        height: 75,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom: -85
    },
    iconContainer: {
        backgroundColor: '#3d7940',
        color: 'white',
        height: 75,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    selected: {
        backgroundColor: '#000000',
        color: 'white',
        height: 75,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: w / 4
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
    }
});