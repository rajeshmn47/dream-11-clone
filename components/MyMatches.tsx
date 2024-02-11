import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getDisplayDate } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadToken, logout } from '../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from './HomeScreen';
import { URL } from '../constants/userConstants';
import BottomBar from './BottomBar';
import Navbar from './navbar/Navbar';
import { Link } from '@react-navigation/native';
import { SceneMap, TabBar, TabBarItem, TabView } from 'react-native-tab-view';



export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
}

const Item = ({ data, date, navigation }: { data: Match, date: any, navigation: any }) => {
    const openPopup = () => {
        navigation.navigate('Detail', {
            matchId: data.id
        });
    }
    return (
        <TouchableOpacity onPress={() => openPopup()}>
            <View style={styles.match}>
                <View>
                    <Text style={styles.title}>{data.match_title}</Text>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.team}>
                        <Image source={{ uri: data.teamHomeFlagUrl }} style={{ width: 15, height: 15 }} />
                        <Text>{data.home.code}</Text>
                    </View>
                    <View style={styles.matchDate}>
                        <Text style={styles.dateText}>{getDisplayDate(data.date, 'i', date)}</Text>
                    </View>
                    <View style={styles.team}>
                        <Text>{data.away.code}</Text>
                        <Image source={{ uri: data.teamAwayFlagUrl }} style={{ width: 15, height: 15 }} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>{data.match_title}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}
const w: any = Dimensions.get('window').width
export type Props = NativeStackScreenProps<RootStackParamList, "MyMatches">;
export default function MyMatches({ navigation, route }: Props) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'completed', title: 'Completed' }]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [completed, setCompleted] = useState<any[]>([])
    const renderItem: ListRenderItem<Match> = ({ item }) => <Item data={item} date={date} navigation={navigation} />;
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/completed/${user._id}`);
                const json: any = await response.json();
                const a: [] = json.upcoming.results;
                setUpcoming([...a])
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
        getupcoming();
    }, []);
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch(`${URL}/myMatches/${user._id}`);
                const json: any = await response.json();
                const a: [] = json.completed.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                const b: [] = json.upcoming.results.sort(
                    (c: any, b: any) => new Date(b.date).valueOf() - new Date(c.date).valueOf()
                );
                setCompleted([...a]);
                setUpcoming([...b])
            } catch (error) {
                console.error(error);
            }
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
    const onPress = () => {
        dispatch(logout())
        dispatch(loadToken())
    }

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={upcoming}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={completed}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );


    const renderScene = SceneMap({
        upcoming: FirstRoute,
        completed: SecondRoute
    });

    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.tabsContainer}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={(a) => setIndex(a)
                    }
                    initialLayout={{ width: w }}
                    overScrollMode={'auto'}
                    renderTabBar={props => (
                        <TabBar
                            {...props}
                            tabStyle={{ width: w / 2, backgroundColor: '#5c5a5a' }}
                            scrollEnabled={true}
                            renderTabBarItem={(props) => (
                                <View>
                                    <TabBarItem

                                        {...props}
                                        activeColor='white'
                                        inactiveColor='white'
                                    />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
            <BottomBar route={route} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    matchesContainer: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10,
        height: 600
    },
    tabsContainer: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0,
        height: 600,
        width: "100%"
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
        paddingHorizontal: 10
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
    }
});