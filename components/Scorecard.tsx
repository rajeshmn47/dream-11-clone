import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, FlatList, TextInput, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './HomeScreen';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/AntDesign';

export interface Contest {
    _id: string;
    playerName: string;
    image: string;
    isSelected: Boolean;
    isCaptain: Boolean;
    isViceCaptain: Boolean;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Captain">;
export default function Scorecard({ data, livescore, g }: { data: any, g: any, livescore: any }) {
    const [tableHead, setTableHead] = useState<any[]>(['batter', 'r', 'b', '4s', '6s', 's/r']);
    const [tableTitle, setTableTitle] = useState(['playerName', 'points', 'c']);
    const [widthArr, setWidthArr] = useState<any[]>([110, 50, 50, 50, 50, 50]);
    const [homePlayers, setHomePlayers] = useState<any[]>([]);
    const [awayPlayers, setAwayPlayers] = useState<any[]>([])
    const [tableData, setTableData] = useState([
        ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
        ['a', 'b', 'c', '1', '2', '3', '1', '2', '3'],
        ['1', '2', '3', '1', '2', '3', '1', '2', '3'],
        ['a', 'b', 'c', '1', '2', '3', '1', '2', '3']
    ])
    useEffect(() => {
        const all: any[] = [];
        const allAway: any[] = [];
        if (data?.teamHomePlayers.length > 0) {
            data.teamHomePlayers.forEach((t: any) => {
                all.push([t.playerName, t.runs, t.balls, t.fours, t.sixes, t.strikeRate]);
            });
        }
        if (data?.teamAwayPlayers.length > 0) {
            data.teamAwayPlayers.forEach((t: any) => {
                allAway.push([t.playerName, t.runs, t.balls, t.fours, t.sixes, t.strikeRate]);
            });
        }
        setHomePlayers([...all])
        setAwayPlayers([...allAway]);
    }, [data]);
    console.log(data, livescore, g, 'livescore')
    return (
        <View style={styles.container}>
            <Collapse style={styles.collapse}>
                <CollapseHeader>
                    {data?.isHomeFirst ? <View style={styles.headerContainer}>
                        <Text style={styles.title}>{data?.titleFI}</Text>
                        <View style={styles.downScore}>
                            <Text>({data?.oversFI}overs) {data?.runFI}/{data?.wicketsFI}</Text>
                            <Icon name="down" />
                        </View>
                    </View>
                        :
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>{data?.titleSI}</Text>
                            <View style={styles.downScore}>
                                <Text>
                                    ({data?.oversSI}overs) {data?.runSI / data?.wicketsSI}
                                </Text>
                                <Icon name="down" />
                            </View>
                        </View>}
                </CollapseHeader>
                <CollapseBody>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={tableHead} flexArr={[1.1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                homePlayers.map((rowData, index) => (
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
                </CollapseBody>
            </Collapse>
            <Collapse>
                <CollapseHeader>
                    {!data?.isHomeFirst ? <View style={styles.headerContainer}>
                        <Text style={styles.title}>{data?.titleFI}</Text>
                        <View style={styles.downScore}>
                            <Text>({data?.oversFI}overs) {data?.runFI}/{data?.wicketsFI}</Text>
                            <Icon name="down" />
                        </View>
                    </View>
                        :
                        <View style={styles.headerContainer}>
                            <Text style={styles.title}>{data?.titleSI}</Text>
                            <View style={styles.downScore}>
                                <Text>
                                    ({data?.oversSI}overs) {data?.runSI / data?.wicketsSI}
                                </Text>
                                <Icon name="down" />
                            </View>
                        </View>}
                </CollapseHeader>
                <CollapseBody>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={tableHead} flexArr={[1.1, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {
                                awayPlayers.map((rowData, index) => (
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
                </CollapseBody>
            </Collapse>
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
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    headerContainer: {
        backgroundColor: 'rgb(254, 244, 222)',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row'
    },
    downScore: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 150
    },
    title: {
        textTransform: 'uppercase'
    },
    collapse: {
        borderBottomColor: '#d89595',
        borderBottomWidth: 1
    }
});