import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { getDisplayDate } from '../utils/dateFormat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadToken, logout } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { checkar, checkwk } from '../utils/playersFilter';
import { getImageName } from '../utils/images';


export type RootStackParamList = {
    Home: undefined;
    Detail: { matchId: string };
    Login: undefined,
    Register: undefined,
    Create: { matchId: string, editMode: Boolean },
    Routes: undefined,
    Captain: { players: any[], matchId: string }
};

export type Props = NativeStackScreenProps<RootStackParamList, "Home">;


export interface Match {
    id: string;
    match_title: string;
    home: any;
    away: any;
    teamHomeFlagUrl: string;
    teamAwayFlagUrl: string;
    date: any;
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

const TeamItem = ({ data, date, match, selectedTeam, setSelectedTeam }: {
    data: Team, date: any, match: any, selectedTeam: any,
    setSelectedTeam: any
}) =>
(
    <View style={styles.container}>
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
                    <Image source={{ uri: getImageName(data.captainId, match) }} style={{ width: 55, height: 55 }} />
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
        <View style={styles.input}>
            <RadioButton.Android
                value={data?._id}
                status={data._id === selectedTeam?._id ?
                    'checked' : 'unchecked'}
                onPress={() => setSelectedTeam(data)}
                color="#3d7248"
            />
        </View>
    </View>
);


export default function SelectTeams({ teams, setSelectTeams, selectedTeam, date, match_details, setSelectedTeam }: {
    teams: any[], setSelectTeams: any,
    date: any, match_details: any, selectedTeam: any, setSelectedTeam: any
}) {
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    const renderTeamItem: ListRenderItem<Team> = ({ item }) => <TeamItem data={item} date={date} match={match_details}
        selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />;
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
            try {
                const response = await fetch('https://backendforpuand-dream11.onrender.com/home');
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
    const onPress = () => {
        dispatch(logout())
        dispatch(loadToken())
    }
    return (
        <View>
            <FlatList
                data={teams}
                renderItem={renderTeamItem}
                keyExtractor={(item: any) => item._id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
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
    wholeTeamContainer: {
        flex: 9,
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
    date: {
        fontSize: 10
    },
    info: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        padding: 2,
        backgroundColor: '#FFF'
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
        textTransform: 'uppercase'
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
    input: {
        flex: 1
    }
});