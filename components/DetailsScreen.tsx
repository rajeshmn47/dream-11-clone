import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Slider } from '@miblanchard/react-native-slider';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getDisplayDate } from '../utils/dateFormat';
import { RootStackParamList } from './HomeScreen';
import { getmatch } from "../actions/matchAction";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import db from "../firebase/config";
import Overview from './topbar/Overview';
import { URL } from '../constants/userConstants';
import { checkar, checkwk } from '../utils/playersFilter';
import { getImgurl } from '../utils/images';


export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: string;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
}

export interface Team {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: string;
    userIds: [];
    players: any[];
    captainId: string;
    viceCaptainId: string;
}


const Item = ({ data, date }: { data: Contest, date: any }) => (
    <View style={styles.contest}>
        <View>
            <Text>{data.price}</Text>
        </View>
        <View style={styles.teamContainer}>
            <View style={styles.team}>
                <Text>{data.totalSpots}</Text>
            </View>
            <View style={styles.team}>
                <Text>{data.userIds.length}</Text>
            </View>
            <View style={styles.team}>
                <Text>{data.teamsId.length}</Text>
            </View>
        </View>
        <View>
            <Slider
                value={data.teamsId.length / data.totalSpots}
                maximumTrackTintColor={'rgb(254, 244, 222)'}
                minimumTrackTintColor={'#b50000'}
                thumbTouchSize={{ width: 0, height: 0 }}
                thumbTintColor={'transparent'}
                thumbStyle={{ width: 0 }}
            />
        </View>
    </View>
);

function getImageName(id: string, match: any) {
    let players: any[] = [...match.teamAwayPlayers, ...match.teamHomePlayers]
    let player: any = {};
    player = players.find((p: any) => p.playerId == id)
    let url: string = getImgurl(player?.image, player?.playerName)
    return url;
}

const TeamItem = ({ data, date, match }: { data: Team, date: any, match: any }) =>

(
    <View style={styles.wholeTeamContainer}>

        <View style={styles.teamTop}>
            <View style={styles.teamInfo}>
                <Text>
                    {match.teamHomeCode}
                </Text>
                <Text>
                    {
                        match.teamHomePlayers.filter((f: any) =>
                            data.players.some((s: any) => f.playerId == s.playerId)
                        ).length
                    }
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Text>
                    {match.teamAwayCode}
                </Text>
                <Text>
                    {
                        match.teamAwayPlayers.filter((f: any) =>
                            data.players.some((s: any) => f.playerId == s.playerId)
                        ).length
                    }
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Text>
                    <Image source={{ uri: getImageName(data.captainId, match) }} style={{ width: 15, height: 15 }} />
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Image source={{ uri: getImageName(data.viceCaptainId, match) }} style={{ width: 15, height: 15 }} />
            </View>

        </View>
        <View style={styles.info}>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>WK </Text>
                <Text>{data.players.filter((p) => checkwk(p.position)).length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>BAT </Text>
                <Text>{data.players.filter((p) => p.position == "batsman").length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>AR </Text>
                <Text>{data.players.filter((p) => checkar(p.position)).length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>BOWL </Text>
                <Text>{data.players.filter((p) => p.position == "bowler").length}</Text>
            </View>
        </View>
    </View>
);

export type Props = NativeStackScreenProps<RootStackParamList, "Detail">;
export default function DetailsScreen({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    console.log(match_details, 'matchDetails');
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [commentary, setCommentary] = useState<any>();
    const [livescore, setLivescore] = useState<any>();
    const [contests, setContests] = useState<[]>([]);
    const layout = useWindowDimensions();
    const [teams, setTeams] = useState<any[]>([]);

    const handlePress = () => {
        navigation.navigate("Create", {
            matchId: route.params.matchId,
            editMode: false
        })
    }

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
            <View>
                <View>
                    <FlatList
                        data={contests}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <Button
                        onPress={handlePress}
                        title="Create Team"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        </View>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={contests}
                        renderItem={renderItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const FourthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={teams}
                        renderItem={renderTeamItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        contests: FirstRoute,
        createTeam: SecondRoute,
        myContests: ThirdRoute,
        myTeams: FourthRoute
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'contests', title: 'Contests' },
        { key: 'createTeam', title: 'Create Team' },
        { key: 'myContests', title: 'My Contests' },
        { key: 'myTeams', title: 'My Teams' }
    ]);
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;
    const renderTeamItem: ListRenderItem<Team> = ({ item }) => <TeamItem data={item} date={date} match={match_details} />;
    useEffect(() => {
        async function getMatch() {
            dispatch<any>(getmatch(route.params.matchId));
            const data = await axios.get(`https://backendforpuand-dream11.onrender.com/getcontests/80941`);
            setContests(data.data.contests);
        }
        getMatch();
    }, []);
    useEffect(() => {
        async function getTeams() {
            dispatch<any>(getmatch(route.params.matchId));
            const data = await axios.get(
                `${URL}/getteam/?matchId=${route.params.matchId}&userid=${user._id}`
            );
            setTeams(data.data.team);
        }
        getTeams();
    }, []);
    useEffect(() => {
        async function getdata() {
            if (route.params.matchId) {
                const docRef = doc(db, "commentary", '80941');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                } else {
                    // docSnap.data() will be undefined in this case
                }
                const unsub = onSnapshot(
                    doc(db, "commentary", '80941'),
                    (doc: any) => {
                        if (doc.data()) {
                            console.log(doc.data(), "data");
                            setCommentary([...doc.data().capital]);
                            setLivescore({ ...doc.data().miniscore });
                        }
                    }
                );
            }
        }
        getdata();
        // onSnapshot((docRef, "cities"), (snapshot) => {
        // let array = []; // Get users all recent talks and render that in leftColumn content
        // console.log(snapshot, "snaps");
        // });
    }, [route.params.matchId]);
    return (
        <View style={styles.container}>
            <Overview livescore={livescore} matchId={route.params.matchId} match_details={match_details} matchlive={matchlive} />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
    },
    contest: {
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
        padding: 5
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
        padding: 2,
        borderRadius: 2,
    },
    wholeTeamContainer: {
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center'
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
    },
    info: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 40,
        padding: 2
    },
    singleInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 2
    },
    teamTop: {
        backgroundColor: '#109e38',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        height: 110,
        width: '100%'
    },
    teamInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    light: {
        color: 'rgb(119, 119, 119)'
    }
});
