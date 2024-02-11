import { StatusBar } from 'expo-status-bar';
import { Button, Modal, ScrollView, StyleSheet } from 'react-native';
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
import { URL } from '../constants/userConstants';


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


export default function ConfirmModal({ open, setOpen, handleclose,
    modal,
    teamid,
    id,
    loadjoined,
    setSelectedTeam }: {
        open: boolean, setOpen: any
        handleclose: any,
        modal: any,
        teamid: string,
        id: string
        loadjoined: any,
        setSelectedTeam: any
    }) {
    const { userToken, user } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    const [text, setText] = useState('');
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    useEffect(() => {
        async function getupcoming() {
            setLoading(true);
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
    const onPress = async () => {
        try {
            const data = await axios.get(
                `${URL}/joincontest/${modal._id}?userid=${user._id}&teamid=${teamid}`
            );
            loadjoined();
            setSelectedTeam(null);
            setOpen(false);
        } catch (e) {
            setOpen(false);
        }
    }
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}

            >
                <View style={styles.modal}>
                    <Button
                        onPress={onPress}
                        title="Join Contest"
                        color="#4c9452"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Modal>
        </View>
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
    modal: {
        width: 320,
        marginTop: 50,
        height: 200,
        marginLeft: 20,
        backgroundColor: "#FFFFF",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        zIndex: 1000,
        padding: 5
    }
});
