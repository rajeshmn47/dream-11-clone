import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet } from 'react-native';
import { Text, FlatList, TextInput, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import axios from "axios";
import { getImageName } from './DetailsScreen';
import { checkar, checkwk } from '../utils/playersFilter';



export default function Team({ match,data,teams, setSelectTeams }: { match:any,data:any,teams: any[], setSelectTeams: any }) {

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
                <Text>{data.players.filter((p:any) => checkwk(p.position)).length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>BAT </Text>
                <Text>{data.players.filter((p:any) => p.position == "batsman").length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>AR </Text>
                <Text>{data.players.filter((p:any) => checkar(p.position)).length}</Text>
            </View>
            <View style={styles.singleInfo}>
                <Text style={styles.light}>BOWL </Text>
                <Text>{data.players.filter((p:any) => p.position == "bowler").length}</Text>
            </View>
        </View>
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
    }
})
