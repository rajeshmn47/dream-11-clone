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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { OtpInput } from "react-native-otp-entry";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import Loader from '../loader/Loader';
import { RootStackParamList } from '../HomeScreen';
import { URL } from '../../constants/userConstants';
import { firebaseConfig } from '../../firebase/config';

export type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
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
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    {otpScreen ? <KeyboardAvoidingView enabled>
                        <View style={styles.SectionStyle}>
                            <OtpInput numberOfDigits={6} onTextChange={(text) => setOtp(text)}
                                theme={{
                                    containerStyle: styles.otpContainer,
                                    inputsContainerStyle: styles.otpInputsContainer,
                                    pinCodeContainerStyle: styles.otpPinCodeContainer,
                                    pinCodeTextStyle: styles.otpPinCodeText,
                                    focusStickStyle: styles.focusStick,
                                    focusedPinCodeContainerStyle: styles.activePinCodeContainer
                                }} />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('Register')}>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView> :
                        <KeyboardAvoidingView enabled>
                            <View style={styles.SectionStyle}>
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(phone) =>
                                        setPhoneNumber(phone)
                                    }
                                    placeholder="Enter Phone Number" //12345
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                    ref={passwordInputRef}
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                    secureTextEntry={false}
                                    underlineColorAndroid="#f000"
                                    returnKeyType="next"
                                />
                            </View>
                            {errortext != '' ? (
                                <Text style={styles.errorTextStyle}>
                                    {errortext}
                                </Text>
                            ) : null}
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleSubmitPress}>
                                <Text style={styles.buttonTextStyle}>Next</Text>
                            </TouchableOpacity>
                            <Text
                                style={styles.registerTextStyle}
                                onPress={() => navigation.navigate('Login')}>
                            Already have account? Login
                            </Text>
                        </KeyboardAvoidingView>
                    }
                </View>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignContent: 'center',
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
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    otpContainer: {
        marginHorizontal: 'auto',
        flex: 1,
        justifyContent: 'space-evenly',
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