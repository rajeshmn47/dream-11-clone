// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    useWindowDimensions,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { OtpInput } from "react-native-otp-entry";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import Loader from '../loader/Loader';
import { RootStackParamList } from '../HomeScreen';
import { URL } from '../../constants/userConstants';

export type Props = NativeStackScreenProps<RootStackParamList, "Entry">;
const w = Dimensions.get('window').width;
const EntryScreen = ({ navigation }: Props) => {
    const recaptchaVerifier: any = React.useRef(null);
    const appVerifier = recaptchaVerifier.current;
    const auth = getAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpScreen, setOtpScreen]: any = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const passwordInputRef: any = createRef();
    const otpRef: any = createRef();
    const attemptInvisibleVerification = false;
    const [verificationId, setVerificationId]: any = React.useState();

    useEffect(() => {
        if (otp.length > 5) {
            verifyOtp(otp)
        }
    }, [otp])

    const handleSubmitPress = () => {
        setErrortext('');
        if (!phoneNumber) {
            alert('Please fill Email');
            return;
        }
        setLoading(true);
        let dataToSend: any = { phoneNumber: phoneNumber };
        let formBody: any = [];
        console.log(dataToSend, 'formbody')
        fetch(`http://192.168.202.175:9000/auth/phoneLogin`, {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                //Header Defination
                'Content-Type': "application/json",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.success === 'ok') {
                    setOtpScreen(true)
                    //AsyncStorage.setItem('server_token', responseJson.token);
                    //console.log(responseJson.data.email);
                } else {
                    setErrortext(responseJson.msg);
                    console.log('Please check your email id or password');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    const verifyOtp = (otpNumber: any) => {
        setErrortext('');
        if (!otp) {
            alert('Please fill Email');
            return;
        }
        else {
            setLoading(true);
            let dataToSend: any = { otp: otp, phoneNumber: phoneNumber };
            fetch(`http://192.168.202.175:9000/auth/verifyPhoneOtp`, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    //Header Defination
                    'Content-Type': "application/json",
                },
            }).then((response) => response.json())
                .then((responseJson) => {
                    //Hide Loader
                    setLoading(false);
                    console.log(responseJson);
                    // If server response message same as Data Matched
                    if (responseJson.success === 'ok') {
                        AsyncStorage.setItem('server_token', responseJson.token);
                        // console.log(responseJson.data.email);
                        navigation.navigate("Home")
                    }
                }).catch((error: any) => {
                    console.error(error)
                    // Error; SMS not sent
                    // ...
                });
            //AsyncStorage.setItem('server_token', responseJson.token);
            //console.log(responseJson.data.email);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainBody}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/background.jpg')}
                        style={{
                            width: '100%',
                            height: 900,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Register"
                    color="#3f7a57"
                    accessibilityLabel="Learn more about this purple button"
                />
                <View style={styles.authContainer}>
                    <TouchableOpacity>
                        <Text
                            style={styles.loginTextStyle}
                            onPress={() => navigation.navigate('Login')}>
                            Already have Account ? Login
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('Register')}>
                        New Here ? Register
                    </Text>
                </View>
            </View>
        </View>
    );
};
export default EntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 1000
    },
    mainBody: {
        height: 60
    },
    bottom: {
        marginTop: 0,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 5,
        width:w
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#40b46e',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#40b46e',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: w / 2
    },
    loginTextStyle: {
        color: '#000000',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        padding: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: w / 2
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    authContainer: {
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    otpInputsContainer: {

    },
    otpPinCodeContainer: {
        marginHorizontal: 3
    },
    otpPinCodeText: {

    },
    focusStick: {

    },
    activePinCodeContainer: {

    }
});