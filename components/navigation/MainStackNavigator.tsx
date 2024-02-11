import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getDisplayDate } from '../../utils/dateFormat';
import HomeScreen from '../HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import DetailsScreen from '../DetailsScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../HomeScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store, persistor } from '../../store';
import LoginScreen from '../auth/Login';
import RegisterScreen from '../auth/Register';
import { loadToken, loadUser } from '../../actions/userAction';
import CreateTeam from '../CreateTeam';
import SelectCaptain from '../Captain';
import ContestDetail from '../ContestDetail';
import MyMatches from '../MyMatches';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
}


const Item = ({ data, date }: { data: Match, date: any }) => (
    <View style={styles.match}>
        <View>
            <Text>{data.match_title}</Text>
        </View>
        <View style={styles.teamContainer}>
            <View style={styles.team}>
                <Image source={{ uri: data.teamHomeFlagUrl }} style={{ width: 40, height: 40 }} />
                <Text>{data.home.code}</Text>
            </View>
            <View style={styles.team}>
                <Text>{getDisplayDate(data.date, 'i', date)}</Text>
            </View>
            <View style={styles.team}>
                <Text>{data.away.code}</Text>
                <Image source={{ uri: data.teamAwayFlagUrl }} style={{ width: 40, height: 40 }} />
            </View>
        </View>
        <View>
            <Text>{data.match_title}</Text>
        </View>
    </View>
);



export default function MainStackNavigator() {
    const dispatch = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());;
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={date} />;
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            dispatch<any>(loadToken())
            dispatch<any>(loadUser())
            setLoading(false);
        }
        getupcoming();
    }, []);
    useEffect(() => {
        const i = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(i);
        };
    }, []);
    return (
        <>
            {userToken == null ? (
                // No token found, user isn't signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                // User is signed in
                <NavigationContainer independent={true}>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Detail" component={DetailsScreen} options={{ headerShown: false }}/>
                        <Stack.Screen name="Create" component={CreateTeam} options={{ headerShown: false }}/>
                        <Stack.Screen name="Captain" component={SelectCaptain} options={{ headerShown: false }}/>
                        <Stack.Screen name="ConDetail" component={ContestDetail} options={{ headerShown: false }}/>
                        <Stack.Screen name="MyMatches" component={MyMatches} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10
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
        backgroundColor: 'white'
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
        padding: 10,
        borderRadius: 2,
    },
    matchTop: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        borderRadius: 2
    },
    matchBottom: {
        backgroundColor: '#fafafa',
        height: 40
    },
    date: {
        fontSize: 10
    }
});