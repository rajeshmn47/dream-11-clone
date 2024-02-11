import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreen';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
import { URL } from '../constants/userConstants';

export interface Contest {
    _id: string;
    playerName: string;
    image: string;
    isSelected: Boolean;
    isCaptain: Boolean;
    isViceCaptain: Boolean;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Captain">;
export default function Stats({ matchdata, team, route }: { matchdata: any, team: any, route: any }) {
    const [tableHead, setTableHead] = useState<any[]>(['playerName', 'points']);
    const [tableTitle, setTableTitle] = useState(['playerName', 'points', 'c']);
    const [widthArr, setWidthArr] = useState<any[]>([180, 180])
    const [tableData, setTableData] = useState([
        ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
        ['a', 'b', 'c', '1', '2', '3', '1', '2', '3'],
        ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
        ['a', 'b', 'c', '1', '2', '3', '1', '2', '3']
    ])
    const [match, setMatch] = useState(null);
    const [players, setPlayers] = useState<any[]>([]);
    const [allPlayers, setAllplayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [dreamTeam, setDreamTeam] = useState<any[]>([]);
    const [next, setNext] = useState(false);
    useEffect(() => {
        const all: any[] = [];
        if (team?.length > 0) {
            team.forEach((t: any) => {
                all.push(...t.players);
            });
        }
        setAllplayers([...all.map((a: any) => [a.playerName, a.points])]);
    }, [team]);
    useEffect(() => {
        async function getupcoming() {
            if (route.params.matchId) {
                setLoading(true);
                const data = await axios.get(`${URL}/getplayers/${route.params.matchId}`);
                setLoading(false);
                const playersdata: any[] = data.data.players.teamAwayPlayers
                    .concat(data.data.players.teamHomePlayers)
                    .map((obj: any) => ({
                        ...obj,
                        isSelected: false,
                        "& .MuiDataGrid-cell:hover": {
                            color: "primary.main",
                        },
                    }));
                setPlayers([...playersdata]);
                setDreamTeam([
                    ...playersdata.sort((a, b) => b.points - a.points).splice(0, 11),
                ]);
                setMatch(data.data.matchdetails);
            }
        }
        getupcoming();
    }, [route.params.matchId]);

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    {
                        allPlayers.map((rowData, index) => (
                            <Row
                                key={index}
                                data={rowData}
                                widthArr={widthArr}
                                style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                textStyle={styles.text}
                            />
                        ))
                    }
                </Table>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        color: 'white'
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
        height: 100,
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
    playerContainer: {
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
    preview: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    nextContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 10,
        padding: 2,
        borderRadius: 2,
        zIndex: 0
    },
    next: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
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
    notSelected: {
        backgroundColor: '#9e7044',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    selected: {
        backgroundColor: '#ecac6f',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
        flexDirection: 'row',
        height: 70,
        padding: 2,
        borderRadius: 2,
    },
    disabled: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    notDisabled: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        color: 'white',
        flexDirection: 'row',
        height: 40,
        padding: 2,
        borderRadius: 15,
        width: '50%'
    },
    players: {
        zIndex: 10
    },
    bright: {
        color: '#FFFFFF'
    },
    dark: {
        color: '#000000'
    },
    captain: {
        borderRadius: 10,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    vCaptain: {
        borderRadius: 10,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no: {
        borderRadius: 10,
        borderColor: '#CCCCCC',
        height: 20,
        width: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    header: { height: 50, backgroundColor: '#537791' },
    dataWrapper: { marginTop: -1 }
});