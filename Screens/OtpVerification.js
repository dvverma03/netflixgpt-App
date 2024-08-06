import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import { useEffect, useRef, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
  
  export default function OtpVerification(props) {
    const e1 = useRef("");
    const e2 = useRef("");
    const e3 = useRef("");
    const e4 = useRef("");
    const e5 = useRef("");
    const e6 = useRef("");
    const [d1, setD1] = useState("");
    const [d2, setD2] = useState("");
    const [d3, setD3] = useState("");
    const [d4, setD4] = useState("");
    const [d5, setD5] = useState("");
    const [d6, setD6] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [resend, setResend] = useState(false);
    const navigation = useNavigation();
    const UserOtp = `${d1}${d2}${d3}${d4}${d5}${d6}`;
    const {email,fullName, password}  = props.route.params?.userData
    const message  = props.route.params?.message
    const dispatch= useDispatch();
    

  const handleVerifyRegister = async () => {
    try {
      
      if(!d1 || !d2 || !d3 || !d4 || !d5 || !d6){
        Alert.alert("please fill all credentials")
        return;
      }
      const res = await axios.post(
        'https://sypto-trading-backend.vercel.app/verify-otp-register',
        {
          fullName:fullName,email:email, UserOtp:UserOtp, password:password
        },
      );
      dispatch(addUser(res?.data))
        try {
          await AsyncStorage.setItem('my-key', "NetflixGPT");
        } catch (e) {
          Alert.alert("unable to store credentials for futures login")
        }
      navigation.navigate("Main",{"name":fullName});
    } catch (error) {
      console.log(error)
      Alert.alert("Invalid OTP, please inter valid otp")
    } 
  };
  

  const ResendOTPHandler = async () => {
    try {
        setResend(true)
        
        const res = await axios.post(
          'https://sypto-trading-backend.vercel.app/register',
          {
            email: email,
            password: password,
            fullName:fullName
          },
        );
      } catch (error) {
        Alert.alert("Invalid credentials")
      } finally {
        
        setResend(false);
      }
};
    
  
    return (
      <View style={styles.Container}>
            <View style={{paddingTop: 60, paddingBottom: 50}}>
              <Text
                style={{
                  borderColor: 'white',
                  borderWidth: 2,
                  fontSize: 25,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}>
               Netflix GPT
              </Text>
            </View>
        <View style={styles.FormContainer}>
          <Text style={styles.SignInText}> OTP Verification</Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 15,
                paddingVertical: 10,
                color:"gray",
              }}
            >
              {message}
            </Text>
          </View>
          <View style={styles.OtpContainer}>
            <TextInput
              ref={e1}
              value={d1}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d1.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD1(txt);
                  e2.current.focus();
                } else if (txt.length <= 0) {
                  e1.current.focus();
                  setD1("");
                }
              }}
            ></TextInput>
            <TextInput
              ref={e2}
              value={d2}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d2.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD2(txt);
                  e3.current.focus();
                } else if (txt.length <= 0) {
                  setD2("");
                  e1.current.focus();
                }
              }}
            ></TextInput>
            <TextInput
              ref={e3}
              value={d3}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d3.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD3(txt);
                  e4.current.focus();
                } else if (txt.length <= 0) {
                  setD3("");
                  e2.current.focus();
                }
              }}
            ></TextInput>
            <TextInput
              ref={e4}
              value={d4}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d4.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD4(txt);
                  e5.current.focus();
                } else if (txt.length <= 0) {
                  setD4("");
                  e3.current.focus();
                }
              }}
            ></TextInput>
            <TextInput
              ref={e5}
              value={d5}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d5.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD5(txt);
                  e6.current.focus();
                } else if (txt.length <= 0) {
                  setD5("");
                  e4.current.focus();
                }
              }}
            ></TextInput>
            <TextInput
              ref={e6}
              value={d6}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                { borderColor: d6.length >= 1 ? "#710dc9" : "#d2d7d2" },
              ]}
              onChangeText={(txt) => {
                if (txt.length >= 1) {
                  setD6(txt);
                  e6.current.focus();
                } else if (txt.length <= 0) {
                  setD6("");
                  e5.current.focus();
                }
              }}
            ></TextInput>
          </View>
  
          <Pressable onPress={handleVerifyRegister} style={styles.PressableButton}>
              <Text style={styles.ButtonText}>Verify</Text>
            </Pressable>
          <Pressable onPress={ResendOTPHandler}>
            <Text
              style={{
                fontSize: 17,
                paddingLeft: 15,
                paddingTop: 15,
              }}
            >
              Resend Code
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    Container: {
      backgroundColor: "#1E1E1E",
      height: "100%",
      alignItems: "center",
    },
  
    FormContainer: {
      backgroundColor: "#3B3B3B",
      flex: 1,
      width: "100%",
      marginTop: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    SignInText: {
      paddingLeft: 10,
      fontSize: 22,
      marginTop: 25,
      marginBottom: 5,
      color:'white'
    },
    PressableButton: {
      backgroundColor: "#710dc9",
      borderRadius: 10,
      marginHorizontal: 10,
      marginTop: 25,
    },
    ButtonText: {
      fontSize: 17,
      padding: 10,
      textAlign: "center",
      color: "white",
    },
    otpBox: {
      borderColor: "gray",
      borderWidth: 2,
      width: 46,
      height: 50,
      borderRadius: 8,
      marginHorizontal: 5,
      marginTop: 20,
      fontSize: 18,
      textAlign: "center",
    },
    OtpContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  