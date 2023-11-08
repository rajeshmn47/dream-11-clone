import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight, TurboModuleRegistry } from 'react-native';
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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
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
import { HandlerCallbacks } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import SelectTeams from './SelectTeams';
import ConfirmModal from './ConfirmModal';
import Scorecard from './Scorecard';
import Stats from './Stats';


export interface Contest {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: any[];
    captainId: string;
    viceCaptainId: string;
    numWinners: number;
}

export interface Team {
    _id: string;
    teamsId: [];
    totalSpots: number;
    price: number;
    userIds: [];
    players: any[];
    captainId: string;
    viceCaptainId: string;
}

export interface MyContest {
    _id: string;
    contest: any;
    teams: any;
}

export interface Commentary {
    ballNbr: string;
    commText: string;
    overNumber: string;
    event: string;
    overSeparator: any;
}


const Item = ({ data, date, selectedTeam, selectTeams, handleClick }: { data: Contest, date: any, selectedTeam: any, selectTeams: any, handleClick: any }) => (
    <TouchableHighlight onPress={() => handleClick(data)}>
        <View style={styles.contest}>
            <View style={styles.contestTop}>
                <View style={styles.pool}>
                    <Text>Prize Pool</Text>
                    <Text>{data?.price}</Text>
                </View>
                <View style={styles.pool}>
                    <Text>Entry</Text>
                    <Text>{data?.teamsId?.length}</Text>
                </View>
            </View>
            <View style={styles.slider}>
                <Slider
                    value={data?.teamsId?.length / data?.totalSpots}
                    maximumTrackTintColor={'rgb(254, 244, 222)'}
                    minimumTrackTintColor={'#b50000'}
                    thumbTouchSize={{ width: 0, height: 0 }}
                    thumbTintColor={'transparent'}
                    thumbStyle={{ width: 0 }}
                />
            </View>
            <View style={styles.spots}>
                <Text>
                    {data.totalSpots} spots left
                </Text>
                <Text>
                    {data.totalSpots} spots
                </Text>
            </View>
            <View style={styles.conBottom}>
                <View style={styles.row}>

                    <Text>
                        ₹{Math.floor(data.price / data.totalSpots)}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View>
                        <Icon name="trophy" />
                    </View>
                    <Text>
                        {Math.floor((data.numWinners / data.totalSpots * 100))}%
                        Single
                    </Text>
                </View>
            </View>
        </View>
    </TouchableHighlight>
);

export function getImageName(id: string, match: any) {
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
                <Text style={styles.bright}>
                    {match.teamHomeCode}
                </Text>
                <Text style={styles.bright} >
                    {
                        match.teamHomePlayers.filter((f: any) =>
                            data.players.some((s: any) => f.playerId == s.playerId)
                        ).length
                    }
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Text style={styles.bright}>
                    {match.teamAwayCode}
                </Text>
                <Text style={styles.bright}>
                    {
                        match.teamAwayPlayers.filter((f: any) =>
                            data.players.some((s: any) => f.playerId == s.playerId)
                        ).length
                    }
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Text style={styles.bright} >
                    <Image source={{ uri: getImageName(data.captainId, match) }} style={{ width: 55, height: 55 }} />
                </Text>
            </View>
            <View style={styles.teamInfo}>
                <Image source={{ uri: getImageName(data.viceCaptainId, match) }} style={{ width: 55, height: 55 }} />
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

const MyCoItem = ({ data, date, match, navigation }: { data: MyContest, date: any, match: any, navigation: any }) =>
(
    <TouchableHighlight onPress={() => navigation.navigate("ConDetail", {
        matchId: match.matchId, contestId: data.contest._id,
        contest: data
    })}>
        <View style={styles.myContest}>
            <View style={styles.myConBottom}>
                <View>
                    <Text>
                        Prize Pool
                    </Text>
                    <Text>
                        {data.contest.price}
                    </Text>
                </View>
                <View>
                    <Text>
                        spots
                    </Text>

                    <Text>
                        {data.contest.totalSpots}
                    </Text>
                </View>
                <View>
                    <Text>
                        Entry
                    </Text>
                    <Text>
                        {data.contest.price / data.contest.totalSpots}
                    </Text>
                </View>
            </View>
            <View style={styles.myConMiddle}>
                <View style={styles.row}>
                    <View style={styles.bigCircle}>
                        <Text>1st</Text>
                    </View>
                    <Text>
                        {data.contest.prizeDetails[0].prize}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View>
                        <Icon name="trophy" />
                    </View>
                    <Text>
                        {data.contest.prizeDetails.length / data.contest.totalSpots * 100}%
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.circle}>
                        <Text>M</Text>
                    </View>
                    <View style={styles.circle}>
                        <Text>C</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                {data.teams.map((t: any) =>
                    <View style={styles.myConBottom}>
                        <Text>
                            {t.username}
                        </Text>
                        <Text>
                            {t.teamnumber}
                        </Text>
                        <Text>
                            {t.points}
                        </Text>
                        <Text>
                            #{t.rank}
                        </Text>
                    </View>)}
            </View>
        </View>
    </TouchableHighlight>
);

const Commentary = ({ data, date, match }: { data: Commentary, date: any, match: any }) =>
(
    <TouchableHighlight>{data.event == 'over-break' ?
        <View style={styles.overBreak}>
            <View>
                <Text>
                    End of over {data.overSeparator.overNumber}
                </Text>
            </View>
            <View style={styles.separator}>
                <Text>{data?.overSeparator.bowlNames[0]}</Text>
                <Text>{data?.overSeparator.runs} runs</Text>
                <Text>{data?.overSeparator.bowlwickets} wickets</Text>
                <Text>{data?.overSeparator.batTeamName}</Text>
                <Text>
                    {data?.overSeparator.score}/{data?.overSeparator.wickets}
                </Text>
            </View>
        </View> :
        <View style={styles.commentary}>
            <View style={styles.left}>

                {data?.event == "WICKET" ? (
                    <View style={styles.wicket}>
                        <Text style={styles.bright}>
                            w</Text>
                    </View>
                ) : data?.event == "FOUR" ? (
                    <View style={styles.four}>
                        <Text style={styles.bright}>
                            4</Text>
                    </View>
                ) : data?.event == "SIX" ? (
                    <View style={styles.six}>
                        <Text style={styles.bright}>
                            6
                        </Text>
                    </View>
                ) : null}
                <Text>
                    {data.overNumber}
                </Text>
            </View>
            <View style={styles.commText}>
                <Text style={styles.text} numberOfLines={5}>
                    {data.commText}
                </Text>
            </View>
        </View>
    }
    </TouchableHighlight>
);


export type Props = NativeStackScreenProps<RootStackParamList, "Detail">;
export default function DetailsScreen({ navigation, route }: Props) {
    const dispatch = useDispatch();
    const { userToken, user } = useSelector((state: any) => state.user);
    const { match_details, matchlive } = useSelector((state: any) => state.match);
    console.log(matchlive, 'matchDetails');
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [commentary, setCommentary] = useState<any>();
    const [livescore, setLivescore] = useState<any>();
    const [contests, setContests] = useState<any[]>([]);
    const [myContests, setMyContests] = useState<any[]>([])
    const layout = useWindowDimensions();
    const [teams, setTeams] = useState<any[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [selectTeams, setSelectTeams] = useState<any>({
        selected: false,
        team: null,
    });
    const [open, setOpen] = useState<boolean>(false);
    const [modal, setModal] = React.useState(null);

    useEffect(() => {
        if (selectTeams.team) {
            setOpen(true);
        }
    }, [selectTeams]);
    useEffect(() => {
        setSelectTeams({
            open: false,
            team: selectedTeam,
        });
    }, [selectedTeam]);

    const handlePress = () => {
        navigation.navigate("Create", {
            matchId: route.params.matchId,
            editMode: false
        })
    }


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'contests', title: 'Contests' },
        { key: 'createTeam', title: 'Create Team' },
        { key: 'myContests', title: `My Contests(${myContests?.length > -1 && myContests?.length})` },
        { key: 'myTeams', title: `My Teams(${teams?.length > -1 && teams?.length})` },
        { key: 'commentary', title: 'Commentary' },
        { key: 'scorecard', title: `Scorecard` },
        { key: 'stats', title: `Stats` }
    ]);
    const handleClick = (contest: any) => {
        setSelectTeams({ selected: true, team: null })
        setModal(contest)
    }
    const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date}
        selectedTeam={selectedTeam} selectTeams={selectTeams} handleClick={handleClick} />;
    const renderTeamItem: ListRenderItem<Team> = ({ item }) => <TeamItem data={item} date={date} match={match_details} />;
    const renderMyCoItem: ListRenderItem<MyContest> = ({ item }) => <MyCoItem data={item} date={date} match={match_details} navigation={navigation} />;
    const renderCommentaryItem: ListRenderItem<Commentary> = ({ item }) => <Commentary data={item} date={date} match={match_details} />;
    useEffect(() => {
        async function getMatch() {
            dispatch<any>(getmatch(route.params.matchId));
            const data = await axios.get(`https://backendforpuand-dream11.onrender.com/getcontests/${route.params.matchId}`);
            setContests(data.data.contests);
            const joinedC = await axios.get(
                `${URL}/getjoinedcontest/${route.params.matchId}?userid=${user._id}`
            );
            setMyContests([...joinedC.data.contests]);
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
                const docRef = doc(db, "commentary", route.params.matchId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                } else {
                    // docSnap.data() will be undefined in this case
                }
                const unsub = onSnapshot(
                    doc(db, "commentary", route.params.matchId),
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

    const handleClose = () => {
        setOpen(false);
    };

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
        <TouchableHighlight onPress={handlePress}>
            <View style={styles.create}>
                <Text style={styles.bright}>
                    Create Team
                </Text>
            </View>
        </TouchableHighlight>
    );

    const ThirdRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={myContests}
                        renderItem={renderMyCoItem}
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

    const FifthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <FlatList
                        data={commentary}
                        renderItem={renderCommentaryItem}
                        keyExtractor={(item: any) => item._id}
                    />
                </View>
            </View>
        </View>
    );

    const SixthRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <Scorecard data={matchlive} g='g' livescore={livescore} />
                </View>
            </View>
        </View>
    );

    const SeventhRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View>
                <View>
                    <Stats matchdata={match_details} team={teams} route={route} />
                </View>
            </View>
        </View>
    );

    const renderScene = SceneMap({
        contests: FirstRoute,
        createTeam: SecondRoute,
        myContests: ThirdRoute,
        myTeams: FourthRoute,
        commentary: FifthRoute,
        scorecard: SixthRoute,
        stats: SeventhRoute
    });

    const loadjoined = async (t: any) => {
        const joinedC: any = await axios.get(
            `${URL}/getjoinedcontest/${route.params.matchId}?userid=${user._id}`
        );
        setContests([...joinedC.data.contests]);
        setSelectTeams({ selected: false, team: t });
    };

    return (
        <View style={styles.container}>
            {!selectTeams.selected ?
                <>
                    <Overview livescore={livescore} matchId={route.params.matchId} match_details={match_details} matchlive={matchlive} />
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        overScrollMode={'auto'}
                        renderTabBar={props => (
                            <TabBar
                                {...props}
                                indicatorStyle={{ backgroundColor: 'white' }}
                                tabStyle={{ width: 145 }}
                                scrollEnabled={true}
                                style={{ backgroundColor: '#9133f0' }}
                            />
                        )}
                    />
                    <ConfirmModal
                        open={open}
                        setOpen={setOpen}
                        handleclose={handleClose}
                        modal={modal}
                        teamid={selectedTeam?._id}
                        id={route.params.matchId}
                        loadjoined={loadjoined}
                        setSelectedTeam={setSelectedTeam}
                    />
                </> :
                <SelectTeams teams={teams} setSelectTeams={setSelectTeams} date={date} match_details={match_details} selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        zIndex: 0
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
        height: 170,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    myContest: {
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
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    commentary: {
        margin: 10,
        borderRadius: 10,
        height: 'auto',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
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
    pool: {
        backgroundColor: 'white',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'column',
        height: 40,
        padding: 2,
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
    contestTop: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 2,
        paddingBottom: 0
    },
    slider: {
        paddingHorizontal: 5
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
        height: '20%',
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
        height: '80%',
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
    },
    bright: {
        color: '#FFFFFF',
        textTransform: 'uppercase',
        fontSize: 12
    },
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 60,
        padding: 2,
        borderRadius: 15,
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5
    },
    create: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 120,
        padding: 2,
        borderRadius: 15,
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5,
        paddingVertical: 10
    },
    myConBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        padding: 2
    },
    myConMiddle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        padding: 2
    },
    conBottom: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgb(246, 246, 246)',
        height: 50,
        paddingHorizontal: 5
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    circle: {
        borderRadius: 10,
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bigCircle: {
        borderRadius: 15,
        borderColor: '#CCCCCC',
        height: 30,
        width: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    bottom: {
        backgroundColor: 'rgb(254, 244, 222)'
    },
    commText: {
        marginLeft: 10,
        textAlign: 'left'
    },
    overBreak: {
        backgroundColor: 'rgb(250, 250, 250)',
        borderColor: 'rgb(204, 204, 204)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5,
        paddingVertical: 5
    },
    left: {
        width: 40
    },
    separator: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    wicket: {
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        backgroundColor: 'red',
        borderColor: 'red',
        marginBottom: 2
    },
    four: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    six: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderRadius: 10,
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginBottom: 2
    },
    text: {
        width: 270
    },
    spots: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 5
    }
});
