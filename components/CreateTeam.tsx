import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
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
import { TabView, SceneMap, TabBar, TabBarItem } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/AntDesign';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
import { getImgurl } from '../utils/images';
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


export interface Contest {
  _id: string;
  playerName: string;
  image: string;
  isSelected: boolean;
  playerId: string;
}


export type Props = NativeStackScreenProps<RootStackParamList, "Create">;
export default function CreateTeam({ navigation, route }: Props) {
  const dispatch = useDispatch();
  const { match_details, matchlive } = useSelector((state: any) => state.match);
  const [text, setText] = useState('');
  const [upcoming, setUpcoming] = useState([]);
  const [date, setDate] = useState<Date>(new Date());
  const [commentary, setCommentary] = useState<any>();
  const [livescore, setLivescore] = useState<any>();
  const [contests, setContests] = useState([]);
  const layout: any = useWindowDimensions();
  const { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [match, setMatch] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [next, setNext] = useState<Boolean>(false);
  const [nonPlayers, setNonPlayers] = useState<any[]>([]);
  const [lmPlayers, setLmplayers] = useState<any[]>([]);
  const [live, setLive] = useState<any>();

  const handlePress = () => {

  }

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }} >
      <View>
        <View>
          <FlatList
            data={players.filter((p) => checkwk(p.position))}
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
          <FlatList
            data={players.filter((p) => p.position == "batsman")}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
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
            data={players.filter((p) => checkar(p.position))}
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
            data={players.filter((p) => p.position == "bowler")}
            renderItem={renderItem}
            keyExtractor={(item: any) => item._id}
          />
        </View>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    wk: FirstRoute,
    bat: SecondRoute,
    ar: ThirdRoute,
    bowl: FourthRoute
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'wk', title: 'Wk' },
    { key: 'bat', title: 'Bat' },
    { key: 'ar', title: 'Ar' },
    { key: 'bowl', title: 'Bowl' }
  ]);
  const renderItem: ListRenderItem<Contest> = ({ item }) => <Item data={item} date={date} />;

  useEffect(() => {
    async function getupcoming() {
      if (route.params.matchId) {
        setLoading(true);
        const data = await axios.get(`${URL}/getplayers/${route.params.matchId}`);
        setLive(data.data.live);
        let awayPlayers: [] = data.data.matchdetails.teamAwayPlayers.map((obj: any) => ({
          ...obj,
          isHome: false,
          code: data.data.matchdetails?.teamAwayCode,
        }));
        let homePlayers: [] = data.data.matchdetails.teamHomePlayers.map((obj: any) => ({
          ...obj,
          isHome: true,
          code: data.data.matchdetails?.teamHomeCode,
        }));
        if (!data.data.live) {
          if (route.params?.editMode) {
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.slice(0, 8)]
            );
          } else {
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([...p]);
          }
        } else {
          if (route.params?.editMode) {
            const p: any[] = awayPlayers.concat(homePlayers).map((obj: any) => ({
              ...obj,
              isSelected: false,
            }));
            setPlayers([
              ...p.slice(0, 8)
            ]);
          } else {
            const p: any[] = awayPlayers
              .splice(0, 11)
              .concat(homePlayers.splice(0, 11))
              .map((obj: any) => ({
                ...obj,
                isSelected: false,
              }));
            setPlayers([...p.slice(0, 8)]);
          }
        }
        setMatch(data.data.matchdetails);
        const k = homePlayers;
        const l = awayPlayers;
        const nonp: any[] = k
          .splice(k.length - 11, k.length)
          .concat(l.splice(l.length - 11, l.length))
          .map((obj: any) => ({
            ...obj,
            isSelected: false,
          }));
        setNonPlayers([...nonp]);
        const lm: any[] = k
          .splice(k.length - 5, k.length)
          .concat(l.splice(l.length - 8, l.length))
          .map((obj: any) => ({
            ...obj,
            isSelected: false,
          }));
        setLmplayers([...lm]);
      }
      setLoading(false);
    }
    getupcoming();
  }, [route.params.matchId]);
  useEffect(() => {
    async function getplayers() {
      if (user?._id && match) {
        const data = await axios.get(
          `${URL}/getteam/${match?.titleFI}/${match.titleSI}`
        );
        const moredata = await axios.get(
          `${URL}/getteam/${match?.titleSI}/${match?.titleFI}`
        );
        setLmplayers([...data.data.lmplayers]);
      }
    }
    getplayers();
  }, [match, user]);
  const handleClick = (i: string) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = true;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleRemove = (i: string) => {
    const po = players.map((p) => {
      if (p._id === i) {
        p.isSelected = false;
      }
      return p;
    });
    setPlayers([...po]);
  };

  const handleNext = () => {
    if (players.filter((k) => k.isSelected === true).length == 11) {
      navigation.navigate('Captain', { players: players.filter((p) => p.isSelected == true), matchId: route.params.matchId })
    }
  };

  const Item = ({ data, date }: { data: Contest, date: any }) => (
    <TouchableHighlight disabled={players.filter((p: any) => p.isSelected == true).length >= 11
      && (!(players.find((p: any) => (p.playerId == data.playerId && p.isSelected == true))))}
      onPress={!data.isSelected ? () => handleClick(data._id) : () => handleRemove(data._id)}>
      <View style={data.isSelected ? styles.pSelected : styles.notSelected}>
        <View style={!data.isSelected ? styles.teamContainer : styles.selected}>
          <View>
            <Image source={{ uri: getImgurl(data.image, data.playerName) }} style={{ width: 35, height: 35 }} />
          </View>
          <View style={styles.team}>
            <Text>{data.playerName}</Text>
          </View>
          <View style={styles.team}>
            <Text>9.0</Text>
          </View>
          <View style={styles.team}>
            {!data.isSelected ?
              <Text>
                <Icon name="pluscircleo" size={30} color="#900" />
              </Text> :
              <Text>
                <Icon name="minuscircleo" size={30} color="#900" />
              </Text>
            }
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <View style={styles.players}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: 'black' }}
              scrollEnabled={true}
              renderTabBarItem={(props) => (
                <View style={props.key == (!(index == 0) ? 'upcoming' : 'featured') ? styles.firstTab : styles.firstTab}>
                  <TabBarItem
                    {...props}
                    activeColor='white'
                    inactiveColor='black'
                  />
                </View>
              )}
            />
          )}
        />
      </View>
      <View style={styles.nextContainer}>
        <View style={styles.preview}>
          <Icon name="eyeo" color={'#FFFFFF'} />
          <Text style={styles.bright}>
            Preview / Lineup
          </Text>
          <IonicIcon name="people" color={'#FFFFFF'} />
        </View>
        <TouchableHighlight style={
          players.filter((k) => k.isSelected === true).length >= 11
            ? styles.notDisabled
            : styles.disabled
        }
          onPress={() => handleNext()}
        >
          <View
            style={
              players.filter((k) => k.isSelected === true).length >= 11
                ? styles.next
                : styles.disabled
            }
            pointerEvents={players.filter((k) => k.isSelected === true).length >= 11 ? 'none' : 'auto'}
          >
            <Text>next</Text>
          </View>
        </TouchableHighlight>
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
    height: 100,
    backgroundColor: 'white',
    padding: 5
  },
  pSelected: {
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
  teamContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    flexDirection: 'row',
    height: 70,
    padding: 2,
    borderRadius: 2,
    width:'100%'
  },
  selected: {
    flex: 1,
    backgroundColor:'#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    flexDirection: 'row',
    height: 70,
    padding: 2,
    borderRadius: 2,
    width:'100%'
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
    backgroundColor: 'white',
    color: 'white',
    zIndex: 0,
    height: 600,
    width: "100%"
  },
  bright: {
    color: '#FFFFFF',
    textTransform: 'uppercase'
  },
  firstTab: {
    backgroundColor: '#47814c'
  },
  secondTab: {
    backgroundColor: '#2d2d2d'
  },
});